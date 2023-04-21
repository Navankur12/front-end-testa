import React from 'react'
import './style.css';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
export default function Questions() {
  return (
    <div className='main-container-wrapper'>
      <div className='add-question-heading'>
        <div className='question-heading'>
          <div className='back-arrow'><KeyboardBackspaceOutlinedIcon sx={{ color: "#161E29", fontSize: "20px" }} /></div>
          <div className='heading-text'>Add Question</div>
        </div>
        <div className='view-list-btn'>
          <button
            className="view-list-btn-text"
            onClick={() => alert("")}
          >
            <ListOutlinedIcon
              sx={{ fontSize: "20px", color: "#FFFFFF", mr: 1 }}
            />
            View List
          </button>
        </div>
      </div>
      <div className='question-container'>
        <div className='add-question-container'></div>
      </div>
    </div>
  )
}
