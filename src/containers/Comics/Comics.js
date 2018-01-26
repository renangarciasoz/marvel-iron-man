import React, { Component } from 'react';
import '../../static/Comics.css';
import Comic from './Components/Comic';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import CryptoJS from 'crypto-js'

class Comics extends Component {
    
    constructor(props, context){
        super(props, context);
            this.state = {
            comics: [],
            offset: 0,
            total: 0,
            haveMoreComics: true,
            comicData: null
        }

        this.getComicsWebApi = this.getComicsWebApi.bind(this);
    }

    // Faz requisição GET na API da Marvel
    getComicsWebApi() {
        let self = this; //unbinding this...

        // Variáveis para fazer a requisição
        const PRIV_KEY = 'e2199597a3f9599f63758a996587afe0ddcff1d8';
        const PUBLIC_KEY = 'ca35191c98a0ec8a129d625cdaa56ef2';
        const ts = new Date().getTime();
        const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
        const charId = 1009368; //ID do Homem de Ferro
        const url = 'https://gateway.marvel.com:443/v1/public/characters'; // URL da API
        const limit = 21; // Limite de items por requisição 

        axios.get(`${url}/${charId}/comics`, {
            params: {
                ts: ts,
                apikey: PUBLIC_KEY,
                hash: hash,
                format: 'comic',
                formatType: 'comic',
                orderBy: '-onsaleDate',
                noVariants: true,
                limit: limit,
                offset: self.state.offset
            }
            
        }).then(response => {
            if (this.state.offset <= this.state.total) {
                const comics = this.state.comics;
                const offset = this.state.offset + limit;

                response.data.data.results.map((item) => {
                    comics.push(item);
                    
                    return true;
                });

                this.setState({ ...this.state, offset: offset , total: response.data.data.total});
            } else {
                this.setState({ ...this.state, haveMoreComics: false});
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="comics-container">
                <InfiniteScroll
                    pageStart={0}
                    initialLoad
                    loadMore={this.getComicsWebApi}
                    hasMore={this.state.haveMoreComics}
                    loader={<div key={1} className="loader">Loading ...</div>}
                >
                    {this.state.comics.map(function (item, i) {
                        return <Comic key={i} cover={{url: item.thumbnail.path, extension: item.thumbnail.extension}} title={item.title} date={item.dates[1].date} description={item.description}/>
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Comics;