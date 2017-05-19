var urlApi = '';
$(document).ready(function () {
    urlApi = 'https://api.themoviedb.org/3/discover/movie?api_key=e8c6d35a6bd555573d4b93aff5b6743b';
   // var urlApi = 'https://api.themoviedb.org/3/search/movie?api_key=2c8889cb44ec3da352062419180957cf&language=en-US&query=fairy&page=1&include_adult=true®ion=fairy&year=>1960';
    cargarTabla(urlApi, 1);
});

var cargarTabla = function (urlApi, numero) {
    urlApi += '&page=' + numero;
    $.get(urlApi, function (respuesta, estado) {
        if (estado === 'success') {
            $('#pagina-actual').html(respuesta.page);

            var peliculas = '<div id="centrado">';
            $.each(respuesta.results, function (indice, elemento) {
                peliculas += '<div class="tarjeta">';
                peliculas += '<div class="idTitulo"><p class="titulo">' + elemento.title + '</p></div>';

                elemento.poster_path += '?d=' + new Date();/*cuando se hace actualización de la página*/

                if (elemento.poster_path !== null) {
                    /*var lasthree = elemento.poster_path.substr(elemento.poster_path.length - 3);*/
                    /*console.log("lasthree", lasthree);//obtengo jpg la extensión*/
                    peliculas += '<img src="https://image.tmdb.org/t/p/w500' + elemento.poster_path + '" alt="' + elemento.title + '"/><hr>';
                } else {
                    /*https://image.tmdb.org/t/p/w500null de esta forma viene un enlace sin imagen*/
                    peliculas += '<img src="./img/no-image_1024.png" alt="Imágen no disponible"/><hr>';
                }
                peliculas += '<p class="transition"><span>Original Title: </span>' + elemento.original_title + '</p>';
                peliculas += '<p class="detail"><span>Overview: </span>' + elemento.overview.substring(0, 100) + '</p>';
                peliculas += '<p><span>Adult:</span> ' + elemento.adult + '</p>';
                peliculas += '<p><span>Release date: </span>' + elemento.release_date + '</p>';
                peliculas += '<p><span>ID: </span>' + elemento.id + '</p>';
                peliculas += '<p><span>Vote Count: </span>' + elemento.vote_count + '</p>';
                peliculas += '<p><span>Vote Average: </span>' + elemento.vote_average + '</p>';
                peliculas += '</div>';
            });
        } else {
            var peliculas = "<di><p>Películas no disponibles en estos momentos</p></div>"
        }
        document.getElementById('principal').innerHTML = peliculas + '</div>';
    });
}

$('#popularity').click(function () {
    urlApi = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=popularity&api_key=e8c6d35a6bd555573d4b93aff5b6743b';
    cargarTabla(urlApi, 1);
})

$('#voteCount').click(function () {
    urlApi = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_count.desc&api_key=e8c6d35a6bd555573d4b93aff5b6743b';
    cargarTabla(urlApi, 1);
})

$('#voteAverage').click(function () {
    urlApi = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=e8c6d35a6bd555573d4b93aff5b6743b';
    cargarTabla(urlApi,1);
})

$('#adultFilm').click(function () {
    /*var urlApi = 'https://api.themoviedb.org/3/discover/movie?api_key=e8c6d35a6bd555573d4b93aff5b6743b&/movie/?&sort_by=adult.eq=true&sort_by=vote_average.desc';*/
    var urlApi = 'https://api.themoviedb.org/3/discover/movie?api_key=e8c6d35a6bd555573d4b93aff5b6743b&certification_country=US&certification.lte=R';
    cargarTabla(urlApi, 1);
})

$('.fa-arrow-right').click(function () {
    var paginaActual = parseInt($('#pagina-actual').html()) + 1;
    if (paginaActual >= 1) {
        // $('#fecha-izda').removeClass('oculto');
        cargarTabla(urlApi, paginaActual);
    }
    /*else {
        $('#fecha-izda').addClass('oculto');
    }*/
})

$('.fa-arrow-left').click(function () {
    var paginaActual = parseInt($('#pagina-actual').html()) - 1;
    if (paginaActual >= 1) {
        //$('#fecha-izda').addClass('oculto');
        cargarTabla(urlApi, paginaActual);
    } /*else {
        $('#fecha-izda').removeClass('oculto');
    }*/
})

$('#btnBusqueda').click(function () {
    /*https://developers.themoviedb.org/3/getting-started/search-and-query-for-details*/
    var busqueda = document.getElementById('busqueda').value;
    urlApi = 'https://api.themoviedb.org/3/search/movie?api_key=e8c6d35a6bd555573d4b93aff5b6743b&query=' + busqueda;
    cargarTabla(urlApi, 1);
})
/*
 * https://developers.themoviedb.org/3/search/search-movies
 * https://www.themoviedb.org/talk/524cdcd719c29549f408721e?language=es
 * 
 */