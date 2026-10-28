export const quizCategories = ['AI Basics', 'Machine Learning', 'Python', 'Neural Networks']

export const quizzes = {
  'AI Basics': [
    { question: 'Which statement best describes artificial intelligence?', options: ['A specific programming language', 'A broad field focused on intelligent behavior in machines', 'A type of computer hardware', 'A synonym for the internet'], answer: 1, explanation: 'AI is the broad field of building systems that perform tasks associated with intelligent behavior.' },
    { question: 'Which relationship between AI and machine learning is accurate?', options: ['AI is a subset of machine learning', 'They are unrelated fields', 'Machine learning is one approach within AI', 'Machine learning replaced AI'], answer: 2, explanation: 'Machine learning is one family of methods used to build AI systems; AI also includes approaches that do not learn from data.' },
    { question: 'What is a sensible first step before selecting an AI model?', options: ['Define the task and what a useful result means', 'Choose the largest model available', 'Collect every possible data point', 'Optimize training accuracy'], answer: 0, explanation: 'A clear task and evaluation goal help determine whether AI is appropriate and what evidence will count as success.' },
  ],
  'Machine Learning': [
    { question: 'A model predicts the price of a home. Which kind of task is this?', options: ['Clustering', 'Regression', 'Classification', 'Tokenization'], answer: 1, explanation: 'Home price is a numeric value, so predicting it is a regression task.' },
    { question: 'What is the main purpose of a held-out test set?', options: ['Give the model more training examples', 'Tune parameters repeatedly', 'Estimate performance on unseen examples', 'Remove difficult examples'], answer: 2, explanation: 'A test set offers a final estimate of how the trained model may perform on new data.' },
    { question: 'What is overfitting?', options: ['A model performs well on training data but poorly on new data', 'A model has too few features to run', 'A dataset contains no labels', 'A prediction takes too long'], answer: 0, explanation: 'Overfitting means the model learned specifics of training examples that do not generalize.' },
  ],
  Python: [
    { question: 'Which Python expression creates a list of three integers?', options: ['(1, 2, 3)', '[1, 2, 3]', '{1: 2: 3}', '<1, 2, 3>'], answer: 1, explanation: 'Square brackets create a Python list, which is an ordered, mutable collection.' },
    { question: 'What does len(features) return for a list?', options: ['The largest item', 'The data type', 'The number of items', 'The list average'], answer: 2, explanation: 'len() returns the number of items in a list or other sized collection.' },
    { question: 'Why set random_state in a data split?', options: ['To make the split reproducible', 'To sort the data alphabetically', 'To normalize features', 'To remove missing values'], answer: 0, explanation: 'A fixed random state makes a randomized split repeatable for debugging and comparison.' },
  ],
  'Neural Networks': [
    { question: 'What is the role of an activation function?', options: ['Store the training dataset', 'Add non-linearity between layers', 'Choose the train/test split', 'Measure network size'], answer: 1, explanation: 'Nonlinear activations let a network represent more complex relationships than a stack of linear operations.' },
    { question: 'What does a convolutional layer commonly learn from images?', options: ['Local visual patterns', 'The file name', 'A fixed image caption', 'The camera brand'], answer: 0, explanation: 'Convolution filters learn local patterns such as edges and textures that can combine into larger features.' },
    { question: 'During training, what does a loss function measure?', options: ['How far predictions are from target values', 'The number of layers', 'The size of an image file', 'The speed of the computer'], answer: 0, explanation: 'A loss quantifies prediction error and provides a signal used to update model parameters.' },
  ],
}