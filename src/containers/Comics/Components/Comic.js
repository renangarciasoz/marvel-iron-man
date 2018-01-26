import React, { Component } from 'react';
import EllipsisText  from 'react-ellipsis-text';
import '../../../static/Comic.css';

class Comic extends Component {

    render() {

        return (
            <div className="comic">
                <div className="cover" style={{backgroundImage: `url(${this.props.cover.url}.${this.props.cover.extension})`}} ></div>
                <div className="details">
                    <span className="title">
                        <EllipsisText text={this.props.title} length={35} />
                    </span>
                    <span className="description">
                        {this.props.description}
                    </span>
                    <span className="date">{this.props.date}</span>
                </div>
            </div>
        );
    }
}

export default Comic;