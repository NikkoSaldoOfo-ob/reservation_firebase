  // Your web app's Firebase configuration
  

  var firebaseConfig = {
    apiKey: "AIzaSyBTiYkMokwIgrVnAvlxGQu_CXwjGYnpnDk",
    authDomain: "whyhawaii-68725.firebaseapp.com",
    databaseURL: "https://whyhawaii-68725.firebaseio.com",
    projectId: "whyhawaii-68725",
    storageBucket: "whyhawaii-68725.appspot.com",
    messagingSenderId: "670512143133",
    appId: "1:670512143133:web:bf6367b50bb78e5339dff4",
    measurementId: "G-375N5SJGMY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var firestore = firebase.firestore();


  const docRef = firestore.doc("samples/sandwichData");
  const outputHeader = document.querySelector("#hotDogOutput");
  const inputTextField = document.querySelector("#latestHotDogStatus");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");
  
  saveButton.addEventListener("click", function(){


    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
      hotDogStatus: textToSave
    }).then(function(){
      console.log("Status Saved");
    }).catch(function(error){
      console.log("Got an error: ", error);
    });
  });

  loadButton.addEventListener("click",function(){
    docRef.get().then(function (doc) {
      if(doc.exists){
        const myData = doc.data();
        outputHeader.innerText = "Hot dog Status: " + myData.hotDogStatus;
      }
    }).then(function(){
      console.log("Visited Doc Try");
    }).catch(function(error){
      console.log("Got Error Loading: ", error);
    });
  });

  getRealtimeUpdates = function(){
    docRef.onSnapshot(function(doc){
      if(doc.exists){
        const myData = doc.data();
        outputHeader.innerText = "Hot dog Status: " + myData.hotDogStatus;
      }
    })
  }

  getRealtimeUpdates();