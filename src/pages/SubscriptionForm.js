import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const USERNAME_LIMITS = /^[A-z][A-z0-9-]{4,23}$/
const EMAIL_LIMITS = /^[A-z][A-z0-9-_.]+@email.com$/
const PWD_LIMITS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{7,23}$/

const SubscriptionForm= () => {

  const skills = [
    {type: 'Javascript'}, 
    {type: 'React'}, 
    {type: 'Svelte'}, 
    {type: 'Nodejs'}, 
    {type: 'Qwik'},
    {type: 'other'}
  ]

  const { setUser } = useContext(DataContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdCo, setPwdCo] = useState('')
  const [skillSelected, setSkillSelected] = useState('Select...')
  const [subscribeNewsLetter, setSubscribeNewsLetter] = useState(false)

  const [focusUsername, setFocusUsername] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusPwd, setFocusPwd] = useState(false)
  const [focusSele, setFocusSele] = useState(false)

  const [wrongUsername, setWrongUsername] = useState(false)
  const [wrongEmail, setWrongEmail] = useState(false)
  const [wrongPwd, setWrongPwd] = useState(false)
  const [wrongPwdCo, setWrongPwdCo] = useState(false)

  const [validUsername, setValidUsername] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPwd, setValidPwd] = useState(false)
  const [correctPwdCo, setCorrectPwdCo] = useState(false)
  const [optionSelected, setOptionSelected] = useState(false)


  const navigate = useNavigate()

  useEffect(() => {
    if(!validUsername) {
      setWrongUsername(true)
    }
    if(validUsername) {
      setWrongUsername(false)
    }
    setValidUsername(USERNAME_LIMITS.test(username))
  }, [username, validUsername])

  useEffect(() => {
    if(!validEmail) {
      setWrongEmail(true)
    }
    if(validEmail) {
      setWrongEmail(false)
    }
    setValidEmail(EMAIL_LIMITS.test(email))
  }, [email, validEmail])

  useEffect(() => {
    if(!validPwd) {
      setWrongPwd(true)
    }
    if(validPwd) {
      setWrongPwd(false)
    }
    if(!correctPwdCo) {
      setWrongPwdCo(true)
    }
    if(correctPwdCo) {
      setWrongPwdCo(false)
    }
    setValidPwd(PWD_LIMITS.test(pwd))
    setCorrectPwdCo(pwd === pwdCo && pwd)
  }, [pwd, pwdCo, validPwd, correctPwdCo])

  useEffect(() => {
    (skillSelected !== 'Select...') ? setOptionSelected(true) : setOptionSelected(false); 
  }, [skillSelected, optionSelected])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const subscriber = {username, pwd, email, skillSelected, subscribeNewsLetter}
  
    console.log(subscriber, 'ddddddd')
    const us = USERNAME_LIMITS.test(username)
    const pw = PWD_LIMITS.test(pwd)
    const em = EMAIL_LIMITS.test(email)

    if(!optionSelected) {
      setFocusSele(true)
      return
    } else {
      setFocusSele(false)
    }

    if(us && pw && em && pwd === pwdCo) {
      setUser(subscriber)  
      setUsername('')
      setEmail('')
      setPwd('')
      setPwdCo('')
      setSkillSelected('Select...')
      setValidUsername(false)
      setValidEmail(false)
      setValidPwd(false)
      setCorrectPwdCo(false)
      navigate('todos')
    }
}

  return ( 
    <div className="subscription-form">
      <form aria-label="myform" onSubmit={handleSubmit}>
        <h3>Subscription Form</h3>
        <label htmlFor='username'>Username</label>
        <input 
        type='text' 
        id='username'
        name='username'
        required 
        autoComplete='off' 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onFocus={() => setFocusUsername(true)}
        onBlur={() => setFocusUsername(false)}
        className={wrongUsername && username ? 'errorinput' : ''}
        />
        <p id="info" className={focusUsername && !validUsername ? "instructions" : "hideIns"}>
        <span className="material-symbols-outlined">Info</span>
          Username Instructions:<br />
          - 5 to 24 characters.<br />
          - Begins with a letter.<br />
          - Letters, numbers, and hyphens are allowed.
        </p>
        <div className={validUsername ? "show" : "hide"}>
          <span className="material-symbols-outlined">Done</span>
          Valid Username.
        </div>

        <label htmlFor='email'>Email</label>
        <input 
        type='email' 
        id='email'
        name='email'
        required 
        autoComplete='off' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocusEmail(true)}
        onBlur={() => setFocusEmail(false)}
        className={wrongEmail && email ? 'errorinput' : ''}
        />
        <p id="info" className={focusEmail && !validEmail ? "instructions" : "hideIns"}>
        <span className="material-symbols-outlined">Info</span>
          Email Instructions:<br />
          - Begins with a letter.<br />
          - Letters, numbers, -, _ and . are allowed.<br />
          - Ends with @email.com
        </p>
        <div className={validEmail ? "show" : "hide"}>
        <span className="material-symbols-outlined">Done</span> 
        Valid Email.
        </div>

        <label htmlFor='password'>Password</label>
        <input 
        type='password'
        id='password' 
        name='password'
        required 
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        onFocus={() => setFocusPwd(true)}
        onBlur={() => setFocusPwd(false)}
        className={wrongPwd && pwd ? 'errorinput' : ''}
        />    
        <p id="info" className={focusPwd && !validPwd ? "instructions" : "hideIns"}>
        <span className="material-symbols-outlined">Info</span>
          Password Instructions:<br />
          - 8 to 24 characters<br />
          - At least one number, uppercase, lowercase<br />
          - At least one symbol: ! @ # $ % ^ & *
        </p>
        <div className={validPwd ? "show" : "hide"}>
        <span className="material-symbols-outlined">Done</span>
        Valid password.
        </div>
                  
        <label htmlFor='confirm-password'>Confirm Password</label>
        <input 
        type='password' 
        id='confirm-password' 
        name='confirm-password'
        required 
        value={pwdCo}
        onChange={(e) => setPwdCo(e.target.value)}
        className={wrongPwdCo && pwdCo ? 'errorinput' : ''}
        />    
        <div className={correctPwdCo ? "show" : "hide"}>
        <span className="material-symbols-outlined">Done</span>
        Password confirmed.</div>

        <label htmlFor='skills'>Select your skill</label>
        <select 
        id='skills'
        name='skills'
        className="skills"
        value={skillSelected}
        onChange={(e) => setSkillSelected(e.target.value)}
        onFocus={() => setFocusSele(true)}
        onBlur={() => setFocusSele(false)}
        >
        <option defaultValue >Select...</option>
        {skills.length && skills.map((skill, index) => (
        <option key={index + 1} >{skill.type}</option>
        ))}
        </select>
        <p id="info" className={focusSele && !optionSelected ? "instructions" : "hideIns"}>
        <span className="material-symbols-outlined">Info</span>
          Required, please select a skill. 
        </p>
        <div className={optionSelected ? "show" : "hide"}>
        <span className="material-symbols-outlined">Done</span> 
        A skill is selected.
        </div>
      
        <input 
        type="checkbox"
        id='checkbox'
        className='checkbox'
        value={subscribeNewsLetter}
        onChange={(e) => setSubscribeNewsLetter( !subscribeNewsLetter )}
        checked={subscribeNewsLetter}
        />
        <label htmlFor='checkbox' className='checkbox-lable'>Subscribe to our newsletter</label><br />

        <button className='subscribe-btn'>Subscribe</button> 
      </form>
    </div>
  )
}
 
export default SubscriptionForm