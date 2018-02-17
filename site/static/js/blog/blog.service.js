(function(){
  angular
    .module('MB')
    .factory('BlogService', BlogService);

  BlogService.$inject = ['DateService'];

  function BlogService(DateService){
    var factory = {
      getPostMetaData: getPostMetaData,
      getPostData: getPostData
    };

    var postMetaData = [

      {
        datePath: "2-22-2017",
        titlePath: "nlp-with-stella",
        title: "Natural Language Processing with Stella",
        author: "Felix Su",
        date: DateService.blogDate(2,22,2017),
        timestamp: DateService.timestamp(2,22,2017),
        tags: ["Project Luna", "NLP", "Speech Recognition", "Hack Night"],
        category: "Hack Night 2",
        preview: "Last Saturday, our Luna developers dove into the Stella Demo to implement Natural Language Processing. If you checked our original source code, you would have seen an ugly jumble of if statements that hard coded mappings between commands and our API functions. To tackle this problem, we split into 2 teams to test which combinations of the NLP techniques we learned at Wednesday's Tech Tutorial could best allow Stella to understand and support commands that our engineers might not anticipate."
      },
      {
        datePath: "2-26-2017",
        titlePath: "sherlock-facial-recognition",
        title: "Launchpad + Computer Vision: Face Detection in 20 Lines of Code",
        author: "Peter Lee",
        date: DateService.blogDate(2,26,2017),
        timestamp: DateService.timestamp(2,26,2017),
        tags: ["Project Sherlock", "Face Detection"],
        category: "Computer Vision Tutorial",
        preview: "In this tutorial, we'll showcase the power of OpenCV by writing a short python script that recognizes your face through a live webcam in real-time. This was a warmup exercise for our newest members of the Launchpad Team for Project Sherlock, a cloud API that provides optimized algorithms for human-centric computer vision."
      },
      { 
        datePath: "8-21-2017",
        titlePath: "music-autoencoders",
        title: "Autoencoders and Music Generation",
        author: "Arsh Zahed",
        date: DateService.blogDate(8,21,2017),
        timestamp: DateService.timestamp(8,21,2017),
        tags: ["DeepBeat", "Music", "Autoencoder", "Magenta"],
        category: "Preseason Demo",
        preview: "Google Brain recently added a new model to Magenta, their open-source project for generating music, audio and drawings. The key to Magenta is the use of Auto-Encoders, a special Neural Network architecture. In this tutorial, we will explore the fundamental concepts and implement some code to get a basic auto-encoder up an running."
      },
      {
        datePath: "8-22-2017",
        titlePath: "stock-prediction",
        title: "Launchpad: Stock Prediction Attempt using LSTMs",
        author: "Caleb Siu",
        date: DateService.blogDate(8,22,2017),
        timestamp: DateService.timestamp(8,22,2017),
        tags: ["Preseason Demo", "LSTM", "Stock Prediction"],
        category: "Preseason Demo",
        preview: "One of the latest models to rise to prominence in the deep learning community has been the Long Short Term Memory network, more commonly known as LSTMs. The model is unique in that it is able to handle long-term dependencies. This is especially useful in solving problems that rely on contextual knowledge based on past inputs. More of what LSTMs are capable of can be read on Andrej Karpathy’s blog post, The Unreasonable Effectiveness of Recurrent Neural Networks."
      },
      {
        datePath: "8-26-2017",
        titlePath: "music-image",
        title: "Music and Image Classification",
        author: "Nipun Ramakrishnan",
        date: DateService.blogDate(8,26,2017),
        timestamp: DateService.timestamp(8,26,2017),
        tags: ["Audio", "Image", "Music", "Classification"],
        category: "Preseason Demo",
        preview: "Music genre classification is a classic problem in which we try to identify the genre of a given piece of music. It’s a challenging task in the field of Music Information Retrieval with some pretty cool applications. For example, Pandora uses genre classifications to dynamically generate images that complement the music. But how does such a classification system work?"
      }
    ];

    function parseText(text) {
      return text.replace(/^ +| +$/gm, "");
    }

    function cleanPostData(post) {
      post.preview = parseText(post.preview);
      return post;
    }

    function getPostMetaData() {
      var cleanData = postMetaData;
      for (var i = 0; i < cleanData.length; i++) {
        cleanData[i].preview = parseText(cleanData[i].preview);
      }
      return cleanData;
    }

    function getPostData(titlePath) {
      for (var i = 0; i < postMetaData.length; i++) {
        if (titlePath == postMetaData[i].titlePath) return cleanPostData(postMetaData[i]);
      }
      return null;
    }

    return factory;
  }
}());
