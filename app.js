/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In the first season before they were wed, Kirlyam and Alan took what unusual precaution?',
      answers: [
        {ans: 'For good marital luck, Kirlyam made them eat pigs feet once every week until they were married.', ansId: 'ans0'},
        {ans: 'Alan’s friend chaperoned them at night, with Kirlyam sleeping in the bedroom and Alan sleeping in the living room with his friend.', ansId: 'ans1'},
        {ans: 'They both purposely sought out others to date in order to test their love', ansId: 'ans2'},
        {ans: 'Alan forbade any physical contact of any kind, including hand holding, if either was on an empty stomach.', ansId: 'ans3'}
      ],
      correctAnswer: {ans: 'Alan’s friend chaperoned them at night, with Kirlyam sleeping in the bedroom and Alan sleeping in the living room with his friend.', ansId: 'ans1'}
    },
    {
      question: 'In Nicole’s and Azan’s relationship, who is more physically aggressive?',
      answers: [
        {ans: 'Neither is physically aggressive.', ansId: 'ans0'},
        {ans: 'Azan', ansId: 'ans1'},
        {ans: 'Nicole, although it’s still worth mentioning Azan is ripped', ansId: 'ans2'},
        {ans: 'Nicole’s 4-year-old daughter.', ansId: 'ans3'}
      ],
      correctAnswer: {ans: 'Nicole, although it’s still worth mentioning Azan is ripped', ansId: 'ans2'}
    },
    {
      question: 'What is Danielle’s top priority in life?',
      answers: [
        {ans: 'Raising her four kids.', ansId: 'ans0'},
        {ans: 'Getting justice through annulling her marriage with Muhammed.', ansId: 'ans1'},
        {ans: 'Maintaining a basic level of dignity with her friends and family.', ansId: 'ans2'},
        {ans: 'Living happily ever after with Muhammed.', ansId: 'ans3'}
      ],
      correctAnswer: {ans: 'Living happily ever after with Muhammed.', ansId: 'ans3'}
    },
    {
      question: 'Chantel and Pedro originally told Chantel’s family he was coming to the U.S. for school. When did they tell them the truth about Pedro’s marriage visa and that they were getting married?',
      answers: [
        {ans: 'When he first arrived.', ansId: 'ans0'},
        {ans: 'Two months before the wedding.', ansId: 'ans1'},
        {ans: 'Two weeks before the wedding.', ansId: 'ans2'},
        {ans: 'Two days before the wedding.', ansId: 'ans3'}
      ],
      correctAnswer: {ans: 'Two days before the wedding.', ansId: 'ans3'}
    },
    {
      question: 'Why is Russ always in the wrong when he complains about Paola’s modeling career?',
      answers: [
        {ans: 'His wife is an attractive model and he should be proud of it.', ansId: 'ans0'},
        {ans: 'He is unemployed and her modeling is the only source of income they have.', ansId: 'ans1'},
        {ans: 'It makes her happy and she feels as though she’s living out her dreams.', ansId: 'ans2'},
        {ans: 'All of the above.', ansId: 'ans3'}
      ],
      correctAnswer: {ans: 'All of the above.', ansId: 'ans3'}
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  questionsAnswered: -1,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateQuizStart() {
  //Generates template for start of quiz.
  console.log("generateQuizStart ran.")
  return `<div class="welcome-display">
            <h2 class="welcome-msg">This quiz will test your knowledge on the hit reality show 90 Day Fiance. Click "Begin" to start your quiz.</h2>
            <button class="btn-begin">Begin</button>
          </div>`
}

function generateAnswerElement(answer) {
  //Generates list element for answer choice
  console.log('generateAnswerElement ran.');
  return `<li>
            <input type="radio" name="answer" id="${answer.ansId}">
            <label for="${answer.ansId}">${answer.ans}</label>
          </li>`
}

function generateQuestion(questions, index) {
  //Generates template for current question.
  console.log("generateQuestion ran.")
  const qInfo = questions[index];
  const answers = qInfo.answers.map(answer => generateAnswerElement(answer));
  return `<div class="question-display">
            <p> ${index+1} of ${questions.length}</p>
            <p>Total correct: ${store.score}.</p>
            <form>
              <legend class="question">${qInfo.question}</legend>
              <ul class="answer-list">
              ${answers.join('')}
              </ul>
              <button type="submit" class="answer-submit">Submit</button>
            </form>
          </div>`
}

function checkUserAnswer(questions, index) {
  //Checks if users answer is correct.
  const userAnswerId = $('ul li input:checked').attr('id');
  if (userAnswerId === questions[index].correctAnswer.ansId){
    store.score++
    return 'Correct!'
  } else {
    return 'Incorrect!'
  }
}

function generateQuestionResults(questions, index) {
  //Generates template for current question results.
  console.log("generateQuestionResults ran.")
  return `<div class="answer-result">
            <h2>${checkUserAnswer(questions, index)}</h2>
            <p>The correct answer was ${questions[index].correctAnswer.ans}</p>
            <p>You've correctly answered ${store.score} out of ${store.questionsAnswered+1} questions.</p>
            <button class="btn-next">Next</button>
          </div>`

}

function generateFinalResults() {
  //Generates template for final results.
  console.log("generateFinalResults ran.")
  return `<div>
            <h2>Final Results</h2>
            <p>You answered ${store.score} out of ${store.questions.length} questions correctly</p>
            <button class="btn-try-again">Try Again</button>
          </div>`
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  // Renders content of <main> tag.
  console.log("renderQuiz() ran.");
  let quizDisplay = ''

  if (!store.quizStarted) {
    quizDisplay = generateQuizStart();
  } else if ((store.questionNumber) === store.questions.length){
    quizDisplay = generateFinalResults();
  } else if (store.questionsAnswered < store.questionNumber) {
    quizDisplay = generateQuestion(store.questions, store.questionNumber);
  } else {
    quizDisplay = generateQuestionResults(store.questions, store.questionNumber);
  }

  $('main').html(quizDisplay);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleBegin() {
  //Handles click on 'Begin' button
  $('main').on('click', '.btn-begin', event => {
    console.log('handleBegin ran.');
    store.quizStarted = true;
    renderQuiz();
  });
}

function handleSubmit() {
  //Handles click on 'Submit' button
  $('main').submit(function(event) {
    event.preventDefault();
    console.log('handleSubmit ran.');
    store.questionsAnswered++;
    renderQuiz();
  });
}

function handleNext() {
  //Handles click on next button
  $('main').on('click', '.btn-next', event => {
    console.log('handleNext ran.');
    store.questionNumber++;
    renderQuiz();
  });
}

function handleTryAgain() {
  //Handles click on try again button
  $('main').on('click', '.btn-try-again', event => {
    console.log('handleTryAgain ran.');
    store.quizStarted = false;
    store.questionNumber = 0;
    store.questionsAnswered = -1;
    store.score = 0;
    renderQuiz();
  });
}





function handleQuiz() {
  //Runs render and handler functions.
  renderQuiz();
  handleBegin();
  handleSubmit();
  handleNext();
  handleTryAgain();
}

$(handleQuiz)

