import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from "react-router-dom";
import { buyDragon } from '../redux/actions/buyDragonActions';
import { fetchPublicDragons } from '../redux/actions/publicDragonActions';
import { mateDragon } from '../redux/actions/mateDragonActions';

import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';

class MateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMatingOption: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => {
        const { handleMateModal, fetchPublicDragons } = this.props;
        if (this.node.contains(event.target)) return;
        fetchPublicDragons();
        return handleMateModal();
    }

    handleCloseModal = (event) => {
        const { handleMateModal, fetchPublicDragons } = this.props;
        fetchPublicDragons();
        return handleMateModal();
    }

    handleDisplayOption = () => {
        this.setState({ displayMatingOption: !this.state.displayMatingOption });
    }

    mate = ({ matronDragonId, patronDragonId }) => () => {
        this.props.mateDragon({ matronDragonId, patronDragonId })
            .then(() => {
                if (this.props.mateDragonState.errorMessage) {
                    alert('error:', this.props.mateDragonState.errorMessage);
                }
                else {
                    // this.props.history.push('/account-dragons');
                    alert(this.props.mateDragonState.content.message);
                }
            })
    }

    render() {
        const { handleMateModal } = this.props;
        console.log(this.props.mateDragonState.content.babyDragon)
        // console.log(this.props)
        return (
            <div className='infoModal'>
                {
                    <div ref={node => this.node = node} className='container'>
                        <div className='closeIcon' >
                            <div onClick={this.props.handleMateModal}>&times;</div>
                        </div>

                        <div className='contentContainer'>
                            <div className='title'>Your Selected Patron Dragon</div>

                            <div className='mate-dragons-container'>
                                <div className='dragon-card'>
                                    <DragonAvatar dragon={this.props.dragon} />
                                </div>
                                {
                                    this.props.mateDragonState.matronDragon.dragonId ?
                                        <div className='dragon-card'>
                                            <DragonAvatar dragon={this.props.mateDragonState.matronDragon} />
                                        </div>
                                        : <div></div>
                                }
                            </div>
                            <p className='text'>
                                You will spend <span className='modal-value'>{this.props.dragon.sireValue}</span> value to mate this dragon.
                        </p>
                        </div>
                        {
                            this.state.displayMatingOption
                                ?
                                <MatingOptions patronDragonId={this.props.dragon.dragonId} />
                                :
                                <div className='modal-buttons'>
                                    <button onClick={this.handleDisplayOption}>Select your own matron dragon</button>
                                    <button onClick={this.props.handleMateModal}>Cancel</button>
                                </div>
                        }
                        {
                            this.props.mateDragonState.matronDragon.dragonId ?
                                <div className='modal-buttons'>
                                    <button onClick={this.mate({
                                        patronDragonId: this.props.dragon.dragonId,
                                        matronDragonId: this.props.mateDragonState.matronDragon.dragonId
                                    })}>Mate</button>
                                    <button onClick={this.props.handleMateModal}>Cancel</button>
                                </div>
                                :
                                null
                        }
                        {
                            this.props.mateDragonState.content.babyDragon ?
                                <div className='dragon-card'>
                                    <DragonAvatar dragon={this.props.mateDragonState.content.babyDragon} />
                                </div>
                                :
                                null
                        }

                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        buyDragonState: state.buyDragon,
        accountDragons: state.accountDragons,
        mateDragonState: state.mateDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyDragon: ({ dragonId, saleValue }) => dispatch(buyDragon({ dragonId, saleValue })),
        fetchPublicDragons: () => dispatch(fetchPublicDragons),
        mateDragon: ({ matronDragonId, patronDragonId }) => dispatch(mateDragon({ matronDragonId, patronDragonId }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MateModal));