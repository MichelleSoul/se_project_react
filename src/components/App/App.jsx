import './App.css'
import Header from "../Header/Header"
import Main from "../Main/Main"

const App = () => {
	return (
		<div className='page'>
			<div className='page__content'>
				<Header />
				<Main />
			</div>
		</div>
	)
}

export default App