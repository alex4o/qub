import React, { Component } from 'react'
import { Segment, Button, Image, Icon, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import repo from "../../globals/Repo"
import { Document } from 'react-pdf/dist/entry.webpack'
import { Page } from 'react-pdf'

@observer
export default class Research extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            paperShown: false,
            numPages: null,
            pageNumber: 1,
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
        
    }

    togglePaper() {
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
                <Document file={this.props.paperURL}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        onClick={() => window.open(this.props.paperURL)}
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
            <Segment className="research-item" disabled={this.props.isLocked}>
                <div className="info">
                    <Image src="/placeholder.png" size="medium"/>
                    <div className="research-info">
                        <div>
                            <p> Researcher: {this.props.researcher} </p>
                            <p> Reproducer: {this.props.reproducer} </p>
                            <p> Backed by {this.props.stakers} people</p>
                            {/* <p> {this.props.state} </p> this state is used to say if you can reproduce or */}
                        </div>
                        <div className="button-area">
                            <Button color="blue" disabled={this.props.isLocked} onClick={this.togglePaper.bind(this)}>See more</Button>     
                            <Button disabled={this.props.isLocked || this.props.state === 1 || this.props.state === 2}>
                                {this.props.state === 0 ? "Reproduce" : this.props.state === 1 ? "Pending results" : "Reproduced"} 
                            </Button>
                            <Button disabled={this.props.isLocked || this.props.state === 2} as='div' labelPosition='right'>
                                <Button basic color='green'>
                                    <Icon name='money'/>
                                    Fund
                                </Button>
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