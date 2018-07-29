// --------------- Helpers that build all of the responses -----------------------
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

// --------------- Data ---------------------------------
var laurelFacts = 
[
  {
    "name": "Founder History",
    "fact": "Betty Sonier, Laurel founder, was born in Medford Massachusetts."
  },
  {
    "name": "Founder History",
     "fact": "Betty Sonier, Laurel founder, Moved to Connecticut in 1932."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp was founded in 1945."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp was initially considered a Connecticut Music Educator's Association festival."
  },
  {
    "name": "Camp History",
    "fact": "During World War 2, members of the Connecticut Music Educator's Association supplied camp with ration stamp books for food and gasoline."
  },
  {
    "name": "Camp History",
    "fact": "Campers biked to camp each day for the first season of Laurel Music Camp.  This was not an easy climb!"
  },
  {
    "name": "Camp History",
    "fact": "The first Laurel Music Camp took place in a cottage on Highland Lake, about a milke north west of Camp Workcoeman."
  },
  {
    "name": "Camp History",
    "fact": "The first conductor of Laurel Music Camp was All-State choir director, Noble Cain."
  },
  {
    "name": "Camp History",
    "fact": "Boy scout reservation Workcoeman was selected as the new site of Laurel Music Camp in March of 1946."
  },
  {
    "name": "Founder History",
    "fact": "Laurel Music Camp was a product of an agreement between Music teachers Betty Sonier, Doris Rayner, and G. Albert Pearson and BSA Scouts Prosper Lavieri,  Walter Davey, and Merle Hildreth."
  },
  {
    "name": "Founder History",
    "fact": "Doris Rayner, one of the camp founders passed away in 1981.  Laurel Music Camp still maintains a scholarship in her honor."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp only had a choir from 1945 to 1949."
  },
  {
    "name": "Camp History",
    "fact": "Laurel music camp started with under 20 students in 1945, but by 1949 had 120 students in attendance."
  },
  {
    "name": "Camp History",
    "fact": "A second week of camp was planned for July 2nd 1948, but plans fell through due to logistical issues."
  },
  {
    "name": "Camp Trivia",
    "fact": "Fellowship Through Music, Laurel Music Camp's motto, was coined by early staffer Joe Soifer."
  },
  {
    "name": "Camp History",
    "fact": "1950 marked the first year of orchestra at Laurel Music Camp."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp's first orchestra was conducted by D. Ray Yerger."
  },
  {
    "name": "Camp Trivia",
    "fact": "Uncle Jack's first year as a camper was 1958."
  },
  {
    "name": "Camp History",
    "fact": "1959 marked the first year of band at Laurel Music Camp."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp's first band was directed by Don Razey."
  },
  {
    "name": "Camp Trivia",
    "fact": "The only conductor to ever lead two ensembles in one season is Don Razey.  He conducted both the band and orchestra in the 1959 season."
  },
  {
    "name": "Camp Trivia",
    "fact": "Rouben Gregorian holds the record for the longest consecutive conductor.  He conducted the orchestra from 1971 through 1978."
  },
  {
    "name": "Camp History",
    "fact": "The first camper versus staff softball game was held in 1978."
  },
  {
    "name": "Camp History",
    "fact": "The Jazz band was started in 1994 by Scott L. Friend as a recreation period activity."
  },
  {
    "name": "Camp History",
    "fact": "The first year Jazz Band was included in the concert was in 1996 under the direction of John Mastroianni."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp moved to Camp Seqassen in 1980, due to the possibility that Camp Workcoeman might close."
  },
  {
    "name": "Camp History",
    "fact": "Laurel Music Camp was housed at Camp Sequassen from 1980 until 1994, when it moved back to Camp Workcoeman."
  },
  {
    "name": "Camp Trivia",
    "fact": "Laurel Music Camp's fiftieth season was in 1994."
  },
  {
    "name": "Camp Trivia",
    "fact": "Laurel Music Camp stopped being an official CMEA function in 1994 due to logistical conflicts."
  },
  {
    "name": "Founder History",
    "fact": "Betty Sonier, a founder of Laurel Music Camp and choir director at the Gilbert School passed away in 1997.  She is interred in the same cemetery as the Gilbert family, for whom the Gilbert School was named."
  },
  {
    "name": "Camp Trivia",
    "fact": "The hail storm during the 2017 Laurel Music Camp season was the first of its kind at Camp Workcoeman in living memory."
  },
  {
    "name": "Camp Trivia",
    "fact": "The Class A cheer used to end with a massive stomp, rather than the vocal, huuuh.  It had to be changed due to a structural risk to the dining hall."
  },
  {
    "name": "Camp Trivia",
    "fact": "The Class A cheer is often taught to the rhythm: wherever you go you buy pickles, wherever you go you buy pickles."
  },
  {
    "name": "Camp Trivia",
    "fact": "Campers are woken every morning with the Yodeling Cow."
  },
  {
    "name": "Camp Trivia",
    "fact": "Prior to taps and lights out, campers are often treated at night to camp wide lullabyes played by brass playing senior staff."
  },
  {
    "name": "Camp Trivia",
    "fact": "Original plans to expand Camp Workcoeman's dining hall included blasting THE rock.  This was decided against because it was where the first official Laurel Music camp picture from 1946 was taken.  The Rock is still there, with a plaque dedicated to Elizabeth Ma Sonier."
  },
  {
    "name": "Camp Trivia",
    "fact": "Uncle Jack leads the campers in the Chicken Dance every morning during the camp season."
  },
  {
    "name": "Camp Trivia",
    "fact": "There have never been auditions for admission to Laurel Music Camp."
  },
  {
    "name": "Camp Trivia",
    "fact": "Thousands of dollars in scholarships are given away to Laurel Music Campers ever year."
  },
  {
    "name": "Camp Trivia",
    "fact": "Laurel is the oldest music camp in the state, and possibly the country."
  },
  {
    "name": "Camp Trivia",
    "fact": "Laurel Music Camp's entire staff is comprised of volunteers."
  },
  {
    "name": "Camp Trivia",
    "fact": "Winsted, where Betty Sonier was a teacher for the vast majority of her career, is known as the Laurel city.  This is possibly why the camp was named Laurel Music Camp."
  },
  {
    "name": "Camp Trivia",
    "fact": "There is a 2 to 1 camper to staff ratio."
  },
  {
    "name": "Camp Trivia",
    "fact": "The large instruments that campers borrow for ensemble rehearsals during camp week are loaned by surrounding school systems including Torrington and Winsted."
  },
  {
    "name": "Camp Trivia",
    "fact": "Rivers Cuomo, lead singer of the band Weezer, was in the choir from 1986 to 1987."
  },
  {
    "name": "Camp Trivia",
    "fact": "The 2018 season orchestra performance of the 1812 Overture included real cannons at the mini concert."
  },
  {
    "name": "Camp Trivia",
    "fact": "The schucking of the corn is an annual tradition to help get ready for the Thursday night barbeque and dance."
  },
];

// --------------- Events -----------------------
/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}
/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);
// Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

function getWelcomeResponse(callback) {
    /* If we wanted to initialize the session to have some attributes we could add those here.*/
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to Laurel Music Camp Facts, you can say: Tell me a fact or How long until camp' ;
    /* If the user either does not reply to the welcome message or says something that is not understood, they will be prompted again with this text.*/
    const repromptText = 'You can say: Tell me a fact or How long until camp ' ;
    const shouldEndSession = false;
callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getFallbackResponse(callback) {
    /* If we wanted to initialize the session to have some attributes we could add those here.*/
    const sessionAttributes = {};
    const cardTitle = 'Fallback';
    const speechOutput = 'That is not a recognized request, you can say: Tell me a fact or How long until camp' ;
    /* If the user either does not reply to the welcome message or says something that is not understood, they will be prompted again with this text.*/
    const repromptText = 'You can say: Tell me a fact or How long until camp ' ;
    const shouldEndSession = false;
callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);
const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;
// Dispatch to your skill's intent handlers
    if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent') {
        handleSessionEndRequest(callback);
    } else if (intentName === 'GetNewFactIntent') {
        getFactResponse(callback);
    } else if (intentName === 'CountdownIntent') {
        getCountdownResponse(callback);
    } else if (intentName === 'AMAZON.FallbackIntent'){
      getFallbackResponse(callback);
    }
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for using the Laurel Music Camp Fact Skill, have a great day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;
callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function getFactResponse(callback) {
    
    //get random index from array of data
    var index = getRandomInt(Object.keys(laurelFacts).length -1);
    
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    
    //Get card title from data
    const cardTitle = laurelFacts[index].name;
    
    //Get output from data
    const speechOutput = laurelFacts[index].fact;
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'You can say: Tell me a fact or How long until camp ' ;
    const shouldEndSession = false;
callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

function getCountdownResponse(callback) {
    
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    
    //Get card title
    const cardTitle = "Camp Countdown";
    const today = new Date();
    const campStart = new Date(2019, 05, 22);
    const one_day = 1000*60*60*24; 
    const daysUntil = Math.ceil((campStart.getTime()-today.getTime())/(one_day));
    
    //Get output from data
    const speechOutput = 'Laurel music camp begins on June 22, 2019, which is in ' + daysUntil + ' days.' ;
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'You can say: Tell me a fact or How long until camp ' ;
    const shouldEndSession = false;
callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}
// --------------- Main handler -----------------------
// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);
        
        if (event.session.application.applicationId !== 'amzn1.ask.skill.4732cc22-07b6-4687-95e7-e8bcb77c9f08') {
             callback('Invalid Application ID');
        }
        
if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }
if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
