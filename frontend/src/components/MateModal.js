import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

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
        this.props.fetchPublicDragons();
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside = (event) => {
        if (this.node.contains(event.target)) return;
        return this.props.handleMateModal();
    }

    handleDisplayOption = () => {
        this.setState({ displayMatingOption: !this.state.displayMatingOption });
    }

    mate = ({ matronDragonId, patronDragonId }) => () => {
        this.props.mateDragon({ matronDragonId, patronDragonId })
            .then(() => {
                if (this.props.mateDragonState.errorMessage) {
                    alert(this.props.mateDragonState.errorMessage);
                }
                else {
                    alert(this.props.mateDragonState.content.info.message);
                    this.setState({ displayMatingOption: false });
                }
            })
    }

    render() {
        const { handleMateModal, dragon, mateDragonState } = this.props;
        console.log(this.state.displayMatingOption);
        return (
            <div className='infoModal'>
                <div ref={node => this.node = node} className='container'>
                    <div className='closeIcon' >
                        <div onClick={handleMateModal}>&times;</div>
                    </div>
                    <div>
                        <div className='contentContainer'>
                            <div className='title'>Your Selected Patron Dragon</div>

                            <div className='mate-dragons-container'>
                                <div className='dragon-card'>
                                    <DragonAvatar dragon={dragon} />
                                </div>
                                {
                                    mateDragonState.selectedMatronDragon.dragonId ?
                                        <div className='dragon-card'>
                                            <DragonAvatar dragon={mateDragonState.selectedMatronDragon} />
                                        </div>
                                        : null
                                }
                            </div>
                            <p className='text'>
                                You will spend <span className='modal-value'>{dragon.sireValue}</span> value to mate this dragon.
                                </p>
                            {
                                mateDragonState.content.babyDragon ?
                                    <div>
                                        <div className='title'>Your new baby Dragon</div>
                                        <div className='dragon-card'>
                                            <DragonAvatar dragon={mateDragonState.content.babyDragon} />
                                        </div>

                                        {
                                            this.state.displayMatingOption
                                                ?
                                                <div>
                                                    <MatingOptions patronDragonId={dragon.dragonId} />

                                                    <button onClick={this.mate({
                                                        patronDragonId: dragon.dragonId,
                                                        matronDragonId: mateDragonState.selectedMatronDragon.dragonId
                                                    })}>Mate</button>

                                                    <button onClick={handleMateModal}>Cancel</button>
                                                </div>
                                                :
                                                <div className='modal-buttons'>
                                                    <button onClick={this.handleDisplayOption}>Select another matron dragon</button>
                                                    <button onClick={handleMateModal}>Finish</button>
                                                </div>
                                        }
                                    </div>
                                    :
                                    <div>
                                        {
                                            this.state.displayMatingOption
                                                ?
                                                <MatingOptions patronDragonId={dragon.dragonId} />
                                                :
                                                <div className='modal-buttons'>
                                                    <button onClick={this.handleDisplayOption}>Select your own matron dragon</button>
                                                    <button onClick={handleMateModal}>Cancel</button>
                                                </div>
                                        }
                                        {
                                            mateDragonState.selectedMatronDragon.dragonId ?
                                                <div className='modal-buttons'>
                                                    <button onClick={this.mate({
                                                        patronDragonId: dragon.dragonId,
                                                        matronDragonId: mateDragonState.selectedMatronDragon.dragonId
                                                    })}>Mate</button>
                                                    <button onClick={handleMateModal}>Cancel</button>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mateDragonState: state.mateDragon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPublicDragons: () => dispatch(fetchPublicDragons),
        mateDragon: ({ matronDragonId, patronDragonId }) => dispatch(mateDragon({ matronDragonId, patronDragonId }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MateModal));