# liri
liri-node-app like siri but text

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface.
 LIRI will be a command line node app that takes in parameters and gives you back data.
    
    You need  npm install --save prompt-list this is use to select one of the following options
       1) 'my-tweets',
       2) 'spotiy-this-song',
       3) 'movie-this',
       4) 'do-what-it-says'

    which will do the following options

    1) LIRI will display your latest tweets and the date it was created. You need:
            npm install twitter and twitter developer credentials


    2) LIRI will diplay a song from spotify api. To prompt the user for a song you will need to install npm install --save prompts then it will show the following information about the song
        
            * Artist(s)
            * The song's name
            * A preview link of the song from Spotify
            * The album that the song is from
    
        If no song is provided then your program will default to "The Sign" by Ace of Base. You need:
             npm install --save node-spotify-api and spotify developer credientials + token.
    
    3) LIRI will display a movie from the OMDB api. it will show the following information about the movie

            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie.

        If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' You need:
             npm install request

    4) Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    Additionally, you will need npm install dotenv to work with you .env file in order to get access to twitter and spotify. 


   