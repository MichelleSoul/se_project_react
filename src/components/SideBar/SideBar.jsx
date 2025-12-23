import "./SideBar.css";
import Avatar from "../Avatar/Avatar";

const SideBar = ({ handleChangeProfileDataClick, onSignOut, name, avatar }) => {
  return (
	<div className="sidebar">
		<div className="sidebar__profile">
			<Avatar name={name} avatar={avatar} size={56} />
			<p className="sidebar__username">{name}</p>
		</div>
		<div className="sidebar__options">
			<button
				onClick={handleChangeProfileDataClick}
				className="sidebar__options-btn"
			>
				Change profile data
			</button>
			<button
				onClick={onSignOut}
				className="sidebar__options-btn"
			>
				Log out
			</button>
		</div>
	</div>
  )
}

export default SideBar;