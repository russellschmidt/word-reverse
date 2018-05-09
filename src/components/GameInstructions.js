import React from 'react'
import Faker from 'faker'

export default () => (
  <div className="game-instructions__text">
    <h3>Hello there!</h3>
    <p>I am {Faker.name.firstName()} {Faker.name.lastName()}, and I am a {Faker.name.jobTitle()}. </p>
    <p>We were impressed with your qualifications and are excited to work with you on an interim contract basis through a third party agency. Welcome to the team!<super>*</super></p>
    <p>As you may know, your task will be to <b>decipher the words that appear on screen. Accuracy is crucial to our operations and success.</b></p>
    <p>We will provide you with feedback on your performance. Various managers will also appear to check in on you.</p>
    <p>Good luck and see you around the water cooler!</p>
  </div>
)