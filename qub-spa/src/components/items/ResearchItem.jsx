import React, { Component } from 'react'
import { Segment, Button, Image, Icon, Label, Modal, Input } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import repo from "../../globals/Repo"
import { Document } from 'react-pdf/dist/entry.webpack'
import { Page } from 'react-pdf'
import  Vote from '../Vote'
import ReproduceResearch from '../ReproduceResearch'
import SubmitReproduction from '../SubmitReproduction'


@observer
export default class Research extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            paperShown: false,
            paper: this.props.paperURL,
            numPages: null,
            loading: true,
            openModal: false,
            pageNumber: 1,
            amount: 0,
            
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleClose() {
        this.setState({ openModal: false })
    }

    submit() {
        this.props.research.stake(this.state.amount)
        this.setState({ openModal: false })
    }

    openModal() {
        this.setState({ openModal: true })
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    loadedThumbnail() {
        this.setState({ loading: false })
    }

    toggleResults() {
        this.setState({ paper: this.props.reproducedURL })
        this.setState({ paperShown: !this.state.paperShown })
    }

    togglePaper() {
        this.setState({ paper: this.props.paperURL })
        this.setState({ paperShown: !this.state.paperShown })
    }

    inc() {
        if(this.state.pageNumber !== this.state.numPages) {
            this.setState({ pageNumber: this.state.pageNumber + 1 })
        }
    }

    dec() {
        if(this.state.pageNumber > 1) {
            this.setState({ pageNumber: this.state.pageNumber - 1 })
        }
    }

    renderPaper() {
        const { pageNumber, numPages } = this.state;

        return (
            <div className="paper">
                <Document file={this.state.paper}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        onClick={() => window.open(this.state.paper)}
                    >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
                <div className="paperInfo">
                    <Button className="fwdButtons" disabled={this.props.isLocked} onClick={this.dec.bind(this)}>←</Button>
                    <Button className="fwdButtons" disabled={this.props.isLocked} onClick={this.inc.bind(this)}>→</Button>            
                </div>
            </div>
        )
    }

    render(){
        return(
            <Segment className="research-item" 
                    //disabled={this.props.isLocked} 
                    loading={this.props.loading}>
                <div className="info">
                    <Segment className="thumbnail" loading={this.state.loading}>
                        <Document file={this.props.paperURL} onLoadSuccess={this.loadedThumbnail.bind(this)}>
                            <Page scale={0.4} pageNumber={1}/>
                        </Document>
                    </Segment>
                    <div className="research-info">
                        <div>
                            <h3> {this.props.title} </h3>
                            <p> Researcher: 
                                <a target="_blank" href={"https://orcid.org/" + this.props.research.researcherID}> 
                                    {this.props.research.researcher} 
                                </a>
                            </p>
                            {console.log(this.props.research)}
                            <p> Reproducer: { 
                                this.props.reproducer !== "" ? 
                                    <a target="_blank" href={"https://orcid.org/" + this.props.research.reproducerID}> 
                                        {this.props.research.reproducer}
                                    </a>
                                    : "Pending researcher"
                                }
                            </p>
                            <p> Backed by {this.props.stakers.length} people</p>
                            {/* <p> {this.props.state} </p> this state is used to say if you can reproduce or */}
                        </div>
                        <div className="button-area">
                            <Button className="btns" 
                                    color="blue" 
                                    onClick={this.togglePaper.bind(this)}>
                                See { !this.state.paperShown ? "more" : "less"}
                            </Button>
                            
                            { this.props.research.state === 1 && this.props.research.stakers.length > 0 ?
                                <Vote research={this.props.research}
                                      trigger={
                                        <Button className="btns" color="violet"> { this.props.research.canVote ? "Vote" : "Votes"} </Button>
                                        }
                                /> 
                            : null }
                            
                            { 
                                this.props.research.state === 1 && this.props.research.canSubmit ? 
                                <SubmitReproduction research={this.props.research} 
                                                    trigger={ <Button className="btns" content="Submit Reproduction"/> }/>
                                : null
                            }
                            
                            { this.props.research.state === 0 ? 
                                <ReproduceResearch research={this.props.research} 
                                                    trigger={
                                                        <Button className="btns" disabled={this.props.isLocked}>Reproduce</Button>
                                                    }/>
                            :
                                <Button className="btns"
                                        disabled={ this.props.research.state === 1 && this.props.research.reproducedURL.length === 0 }
                                        onClick={this.props.research.reproducedURL.length > 0 ? this.toggleResults.bind(this) : null}
                                    >
                                    { this.props.research.state === 1 && this.props.research.reproducedURL.length === 0 ? "Pending results" : undefined}
                                    { this.props.research.reproducedURL.length > 0 ? "Results" : undefined}
                                </Button>
                            }

                            <Button className="btns" disabled={this.props.research.state === 2} as='div' labelPosition='right'>
                                <Modal open={this.state.openModal} onClose={this.handleClose.bind(this)} trigger={
                                    <Button disabled={this.props.isLocked} basic color='green' onClick={this.openModal.bind(this)}>
                                        <Icon name='money'/>
                                        Fund
                                    </Button>}
                                     className="vote-modal" closeIcon>
                                    <Segment className="fundModal">
                                        <h2>Interested in the reproducability of this project?</h2>
                                        <Input  name="amount" 
                                                type="number"
                                                onChange={this.handleChange.bind(this)} 
                                                placeholder="How much ETH do you want to stake?"/>
                                        <Button className="submit" onClick={this.submit.bind(this)}>Submit</Button>
                                    </Segment>
                                </Modal>
                                <Label as='a' color='green' pointing='left'>
                                    {this.props.stakedAmount}
                                </Label>
                            </Button>
                        </div>
                    </div>
                </div>
                {this.state.paperShown ? this.renderPaper() : null}           
            </Segment>
        );
    }
}