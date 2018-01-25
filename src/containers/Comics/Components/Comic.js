import React, { Component } from 'react';
import '../../../static/Comic.css';

class Comic extends Component {

    render() {

        return (
            <div className="comic">
                <div className="cover" style={{backgroundImage: `url(${this.props.cover.url}.${this.props.cover.extension})`}} ></div>
                <div className="details">
                    <p>{this.props.title}</p>
                    <p>{this.props.description}</p>
                    <p>{this.props.date}</p>
                </div>
            </div>
        );
    }
}

export default Comic;