import React, { Component } from 'react'
import { Segment, Button, Image, Icon, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import repo from "../../globals/Repo"
import { Document } from 'react-pdf/dist/entry.webpack'
import { Page } from 'react-pdf'
import  Vote from '../Vote'
import Fund from '../FundResearch'

@observer
export default class Research extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            paperShown: false,
            paper: this.props.paperURL,
            numPages: null,
            loading: true,
            pageNumber: 1,
        }
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

    applyReproducement() {
        //apply for reproducement
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
            <Segment className="research-item" disabled={this.props.isLocked} loading={this.props.loading}>
                <div className="info">
                    <Segment className="thumbnail" loading={this.state.loading}>
                        <Document file={this.props.paperURL} onLoadSuccess={this.loadedThumbnail.bind(this)}>
                            <Page scale={0.5} pageNumber={1}/>
                        </Document>
                    </Segment>
                    <div className="research-info">
                        <div>
                            <h3> {this.props.title} </h3>
                            <p> Researcher: <a target="_blank" href={"https://orcid.org/" + this.props.researcherID}> {this.props.researcher} </a></p>
                            <p> Reproducer: <a target="_blank" href={"https://orcid.org/" + this.props.reproducerID}> {this.props.reproducer} </a></p>
                            <p> Backed by {this.props.stakers} people</p>
                            {/* <p> {this.props.state} </p> this state is used to say if you can reproduce or */}
                        </div>
                        <div className="button-area">
                            <Button className="btns" color="blue" disabled={this.props.isLocked} onClick={this.togglePaper.bind(this)}>See { !this.state.paperShown ? "more" : "less"}</Button>
                            { this.props.state === 1 ? <Vote trigger={<Button className="btns" color="violet">Vote</Button>}/> : null}
                            <Button className="btns" 
                                    disabled={
                                        this.props.isLocked    || 
                                        this.props.state === 1 }
                                        onClick={this.props.state === 2 ? this.toggleResults.bind(this) : this.props.state === 0 ? this.applyReproducement : null}
                                        >
                            {this.props.state === 0 ? "Reproduce" : this.props.state === 1 ? "Pending results" : "Results"} 
                            </Button>
                            <Button className="btns" disabled={this.props.isLocked || this.props.state === 2} as='div' labelPosition='right'>
                                <Fund trigger ={
                                    <Button basic color='green'>
                                        <Icon name='money'/>
                                        Fund
                                    </Button>
                                }/>
                                <Label disabled={this.props.isLocked || this.props.state === 2} as='a' color='green' pointing='left'>
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