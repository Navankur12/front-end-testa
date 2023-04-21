pipeline
    agent any

stages {
  stage('Build') {
    steps {
      sh 'npm install'
    }
  }
  stages('Test') {
    steps {
      sh 'yarn test' --watchAll=false'
      }
    }
  stages('Deploy') {
    steps {
      sh 'npm start'
    }
  }
 }
}

