import React, { Component } from 'react';
import '../../static/Comics.css';
import Comic from './Components/Comic';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

const charId = 1009368;
const keyAPI = 'ec731b4e6cd615c2b1a7266df12dcf8e';
const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters';
const limit = 10;

class Comics extends Component {


    constructor(props) {
        super(props)

        this.state = {
            comics: [],
            hasMoreItems: true,
            comicsOffset: 0,
            comicsTotal: 0,
            modalIsOpen: false,
            comicData: null
        }
    }

    componentDidMount() {
        this.getComics();
    }

    getComics() {
        axios.get(`${urlAPI}/${charId}/comics`, {
            headers: { 'Accept': '*/*' },
            params: {
                apikey: keyAPI,
                ts: '1511796807392',
                hash: '3a6279c7acc3cd78426149de1a162903',
                format: 'comic',
                formatType: 'comic',
                orderBy: '-onsaleDate',
                noVariants: true,
                limit: limit,
                offset: 0
            }
        }).then(response => {
            let comics = this.state.comics;

            response.data.data.results.map((item) => {
                comics.push(item);
                return true;
            });

            //setting up next API request offset
            let newOffset = this.state.comicsOffset + limit;
            this.setState({ comicsOffset: newOffset });

            //setting up comics total
            if (this.state.comicsTotal === 0) {
                this.setState({ comicsTotal: response.data.data.total });
            }

            //stopping requests
            if (this.state.comicsOffset >= this.state.comicsTotal) {
                this.setState({ hasMoreItems: false });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    renderComics() {
        return this.state.comics.map((item, index) => {
            return <div key={index} onClick={() => this.openModal(item)}>
                <Comic
                    key={index}
                    coverUrl={item.thumbnail.path}
                    coverExtension={item.thumbnail.extension}
                    title={item.title}
                    // date={comicDate}
                    description={item.description}
                />
            </div>
        });
    }

    render() {
        return (
            <div className="comics-container">
                <InfiniteScroll
                    pageStart={0}
                    initialLoad
                    loadMore={this.getComics}
                    hasMore={this.state.hasMoreItems}
                    loader={<div key={1} className="loader">Loading ...</div>}
                >
                    {this.renderComics()}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Comics;