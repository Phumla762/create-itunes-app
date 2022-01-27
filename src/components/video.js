import React from 'react';
import axios from 'axios';
import PageNavigation from './pageNavigation';
import Favourite from './favourites';
import {Button} from 'reactstrap';

class Music extends React.component{
    constructor(props){
        super(props);

        this.state = {
            query: "",
            Results : {},
            loading: false,
            message: "",
            totalResult: 0,
            totalPages: 0,
            currentPageNo: 0,
            favouriteList: []
        };
        this.cancel = "";
    }

    getPageCount = (total, denominator) => {
        const divisible = 0 === total % denominator;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(total/denominator) + valueToBeAdded;
    }

    // once we worked out how the page number is generatored.
    // Now we ensure it actually works by mounting it ( this react component is used to show server-side logic before the actual rendering happens)

    componentWillMount = (updatedPageNumber = "", query) => {
        let pageNumber = updatedPageNumber ? `&page=${updatedPageNumber}` : "";
        const searchUrl = `/videos/${query}/${pageNumber}`;

        if (this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.cancelToken.source();

        axios
        .get(searchUrl, {
            cancelToken: this.cancel.token
        })
        .then(res => {
            const total = res.data.resultCount;
            const totalPagesCount = this.getPageCount(total, 20);
            const resultNotFound = !res.data.length
            ? "there are no moe search results. Search for something else" : "";

            // set the state as it influences the previous set state

            this.setState({
                Results:res.data.results,
                message:resultNotFound,
                totalResult:total,
                totalPages: totalPagesCount,
                currentPageNo: updatedPageNumber,
                loading: false
            });
        })

        .catch(error => {
            if(axios.isCancel(error) || error){
                this.setState({
                    loading:false,
                    message: "Failed to fetch the data"
                })
            }
        })
    }

    // this handleChange is to influence the input value. that the input requests a query/brings about the value which is the query of the url.
    // a query refers a specific page location after the path is given. 
    handleChange = (e) => {
        const query = e.target.value;

        //in the event that there isnt a query of what is written or selected in the input or that its empty thatthis setState would be adjusted as follows.
        if(!query){
            this.setState({
                query,
                Results: {},
                message: "",
                totalPages:0,
                totalResult: 0
            })
        } else {
            this.setState({query: query, loading:true, message:""}, () => {
                this.componentWillMount(1, query);
            })
        }
    }

    handlePageClick = (type, e) => {
        e.preventDefault();
        const updatedPageNumber = "Prev" === type
        ? this.state.currentPageNo - 1 
        : this.state.currentPageNo + 1;

        // now check the page current state
        if(!this.state.loading){
            this.setState({loading: true, message:""}, () => {
                this.componentWillMount(updatedPageNumber, this.state.query);
            });
        }
    }

    // in order for music to be able to be added to favourites list we create a function calling it addTpoFavourite along with its properties of influence.
addToFavourite = (index, trackviewUrl, artistName, artworkUrl100) => {
    const {favouriteList} = this.state;

    //the objects the empty array will store.
    let item = {
        id: index, 
        link: trackviewUrl,
        title: artistName,
        img:artworkUrl100
    };
    this.setState({favouriteList: [...favouriteList, item]});

    console.log(favouriteList);
};

renderSearchResults = () => {
    const {Results} = this.state;

    //now search results have a state.
    if(Object.keys(Results).length && Results.length){
        return (
            <div className="results-container">
                {Results.map((result, index) => {
                    return(
                        <div className="result-item">
                        <a key={index} href={result.trackviewUrl}>
                            <h6 className="image-username">{result.artistName}</h6>
                            <div className="image-wrapper">
                                <img className="image"
                                src={result.artworkUrl100}
                                alt={result.artistName}
                                />
                            </div>
                        </a>
                        <div>
                        
                        <Button
                        color="outline-success"
                        size="sm"
                        onClick={this.addToFavourite.bind(this, index, result.trackviewUrl, result.artistName, result.artworkUrl100)}
                        >
                            add To Favourite
                        </Button>
                        </div>
                        </div>
                       
                    );
                })}
            </div>
        )

    }
    
}

render(){
    const {
        query, message, currentPageNo, totalPages, favouriteList
    } = this.state;

    // handling previous and next page.

    const showPrevLink = 1 < currentPageNo;
    const showNextLink = totalPages > currentPageNo;
    console.log(favouriteList);

    return(
        <div className="container">
            <Favourite favouriteList={favouriteList} />
            

            <h2 className="heading">
                Search
            </h2>
            <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Artist, Song and More"
            onChange={this.handleChange}
            />

            {message && <p className="message">{message}</p>}

            <PageNavigation 
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={e => this.handlePageClick("prev", e)}
            handleNextClick={e => this.handleNextClick("next", e)}
            />


            {this.renderSearchResults()}
            
            <PageNavigation
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={e => this.handlePageClick("prev", e)}
            handleNextClick={e => this.handleNextClick("next", e)}
            />
        </div>
    )
}
}

export default Music;