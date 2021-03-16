import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { fetchPublicDragons } from '../redux/actions/publicDragonActions';
import { fetchAccountDragons } from '../redux/actions/accountDragonActions';
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
        this.props.fetchAccountDragons();
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
        console.log(mateDragonState)
        return (
            <div className='infoModal'>
                <div ref={node => this.node = node} className='mate-modal-container'>
                    <div className='closeIcon' >
                        <div onClick={handleMateModal}>&times;</div>
                    </div>
                    <div className='contentContainer'>
                        <div className='mate-dragons-container'>
                            <div className='parent-dragons-container'>
                                <div className='modal-mate-dragon'>
                                    <div className='modal-sub-title'>Your Selected Patron Dragon</div>
                                    <div className='dragon-card patron-dragon'>
                                        <DragonAvatar dragon={dragon} />
                                    </div>
                                </div>
                                <div>
                                    {
                                        mateDragonState.selectedMatronDragon.dragonId ?
                                            <div className='modal-mate-dragon'>
                                                <div className='modal-sub-title'>Your Own Matron Dragon</div>
                                                <div className='dragon-card matron-dragon'>
                                                    <DragonAvatar dragon={mateDragonState.selectedMatronDragon} />
                                                </div>
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </div>
                            </div>
                            {
                                mateDragonState.content.babyDragon ?
                                    <div className='modal-mate-dragon'>
                                        <div className='modal-sub-title'>Your new baby Dragon</div>
                                        <div className='dragon-card baby-dragon'>
                                            <DragonAvatar dragon={mateDragonState.content.babyDragon} />
                                        </div>
                                    </div>
                                    : <div></div>
                            }
                        </div>
                        <div>
                            {
                                mateDragonState.selectedMatronDragon.dragonId ?
                                    <div>
                                        {
                                            this.state.displayMatingOption
                                                ?
                                                <div>
                                                    <MatingOptions patronDragonId={dragon.dragonId} />
                                                    <p className='modal-mate-text'>
                                                        You will spend <span className='modal-value'>{dragon.sireValue}</span> value to mate this dragon.
                                                    </p>
                                                    <div className='modal-mate-buttons'>
                                                        <button className='modal-button' onClick={this.mate({
                                                            patronDragonId: dragon.dragonId,
                                                            matronDragonId: mateDragonState.selectedMatronDragon.dragonId
                                                        })}>Mate</button>
                                                        <button className='modal-button' onClick={handleMateModal}>Cancel</button>
                                                    </div>
                                                </div>
                                                :
                                                <div className='modal-buttons'>
                                                    <button className='modal-button' onClick={this.handleDisplayOption}>Select another matron dragon</button>
                                                    <button className='modal-button' onClick={handleMateModal}>Finish</button>
                                                </div>
                                        }
                                    </div>
                                    :
                                    <div>
                                        {
                                            this.state.displayMatingOption
                                                ?
                                                <div>
                                                    <MatingOptions patronDragonId={dragon.dragonId} />
                                                    <p className='modal-mate-text'>
                                                        You will spend <span className='modal-value'>{dragon.sireValue}</span> value to mate this dragon.
                                                    </p>
                                                    <div className='modal-mate-buttons'>
                                                        <button className='modal-button' onClick={this.mate({
                                                            patronDragonId: dragon.dragonId,
                                                            matronDragonId: mateDragonState.selectedMatronDragon.dragonId
                                                        })}>Mate</button>
                                                        <button className='modal-button' onClick={handleMateModal}>Cancel</button>
                                                    </div>
                                                </div>
                                                :
                                                <div className='modal-buttons'>
                                                    <button className='modal-button' onClick={this.handleDisplayOption}>Select a matron dragon</button>
                                                    <button className='modal-button' onClick={handleMateModal}>Cancel</button>
                                                </div>
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
        fetchAccountDragons: () => dispatch(fetchAccountDragons),
        mateDragon: ({ matronDragonId, patronDragonId }) => dispatch(mateDragon({ matronDragonId, patronDragonId }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MateModal));