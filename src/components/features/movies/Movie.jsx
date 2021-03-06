import React, { Component } from 'react';
import { toogleLikeMovie, getNumberOfLike} from '../../../services/fakeMovieService';
import { getGenres } from '../../../services/genreService';
import { getMovies, deleteMovie } from '../../../services/movieService';
import {Pagination, ListGroup} from '../../';
import {paginate} from '../../../utils/paginate';
import MovieTable from './MovieTable';
import { toast } from 'react-toastify';
import _ from 'lodash';

export default class Movie extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        numberOfLike: getNumberOfLike(),
        genres: [],
        selectedGenre: {},
        sortColumn: {path: 'title', order: 'asc'}
    }

    async componentDidMount(){
        const {data} = await getGenres();
        const {data: movies} = await getMovies();
        const genres = [{name: 'All genres', _id: "allGenres"},...data]
        this.setState({
            movies,
            genres
        })
    }

    toogleLike = (movie) => {
        toogleLikeMovie(movie._id);
        this.setState({movies: getMovies(), numberOfLike: getNumberOfLike()});
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    }

    handleDeleteMovie = async (movie) => {
        const originalMovies = [...this.state.genres];
        const movies = originalMovies.filter( m => m._id !== movie._id);
        this.setState({
            movies
        })
        try{
            await deleteMovie(movie._id);
        } catch( ex ){
            if(ex.response && ex.response.status === 404) toast.error('This movie has already been deleted.');
            this.setState({
                movies: originalMovies
            })
        }
    }

    handleGenreselect = (selectedGenre) => {
        this.setState({ selectedGenre, currentPage: 1 });
    }

    handleSort = sortColumn => {

        this.setState({
            sortColumn
        })
    }

    getPageData = () => {

        const {
            pageSize,
            currentPage,
            movies: allMovies,
            selectedGenre,
            sortColumn} = this.state;

        const filteredItems = !_.isEmpty(selectedGenre) && selectedGenre._id && (selectedGenre._id !== 'allGenres')
        ? allMovies.filter( m => m.genre._id === selectedGenre._id )
        : allMovies;

        const sorted =_.orderBy(filteredItems, [sortColumn.path], sortColumn.order);
        const movies = paginate(sorted, currentPage, pageSize);

        return {movies, totalCount: filteredItems.length}
    }

    render() {
        const {length: count} = this.state.movies;
        const {
            pageSize,
            currentPage,
            numberOfLike,
            genres: allGenre} = this.state;

        if(count === 0) return <p className="m-4">No movie in Databse</p>;

        const {totalCount, movies: data} = this.getPageData();

        return (
            <div className="container">
                <div className="row d-flex flex-column mb-4 mt-4">
                    <p className="m-1">There is {totalCount} movie(s) in database</p>
                    <p className="m-1">There is {numberOfLike} liked </p>

                </div>
                <div className="row">
                    <div className="col-2">
                        <ListGroup
                            items={allGenre}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreselect}
                        />
                    </div>
                    <div className="col">
                        <MovieTable
                            movies={data}
                            onDeleteMovie={this.handleDeleteMovie}
                            onLikeOrUnlike={this.toogleLike}
                            onSort={this.handleSort}
                            sortColumn={this.state.sortColumn}
                        />
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
