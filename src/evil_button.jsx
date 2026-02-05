import { useEffect, useRef, useState, useLayoutEffect} from "react"
import React from 'react';

const OFFSET = 50

export default function EvilButton() {
  const buttonRef = useRef(null)
  const state = useState(0)
  const windowBox = document.body.getBoundingClientRect()

  useEffect(() => {
    const evilButton = buttonRef.current
    const yesButton = document.getElementById("jaa-button")
    const mainWindow = document.getElementById("main-window")
  
    if (!evilButton || !yesButton) return
  
    const updatePosition = () => {
      const yesRect = yesButton.getBoundingClientRect()

      console.log(mainWindow.getBoundingClientRect().width)
  
      setButtonPosition(
        evilButton,
        yesRect.right + mainWindow.getBoundingClientRect().width * 0.4 - yesRect.width,
        yesRect.top
      )
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
  
    return () => {
      window.removeEventListener("resize", updatePosition)
    }
  }, [])

  useEffect(() => {
    const evilButton = buttonRef.current
    if (!evilButton) return

    const handleMouseMove = (e) => {
      const x = e.pageX
      const y = e.pageY


      const buttonBox = evilButton.getBoundingClientRect()

      const horizontalDistanceFrom = distanceFromCenter(
        buttonBox.x,
        x,
        buttonBox.width
      )   
      const verticalDistanceFrom = distanceFromCenter(
        buttonBox.y,
        y,
        buttonBox.height
      )

      const horizontalOffset = buttonBox.width / 2 + OFFSET
      const verticalOffset = buttonBox.height / 2 + OFFSET

      if (
        Math.abs(horizontalDistanceFrom) <= horizontalOffset &&
        Math.abs(verticalDistanceFrom) <= verticalOffset
      ) {
        setButtonPosition(
          evilButton,
          buttonBox.x + (horizontalOffset / horizontalDistanceFrom) * 20,
          buttonBox.y + (verticalOffset / verticalDistanceFrom) * 20
        )
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleClick = () => {
    alert("Wow, ich seh schon...")
    window.close()
  }

  return (
    <button className="nee"
      ref={buttonRef}
      onClick={handleClick}
      style={{
        position: "absolute",
        top: '40%'
      }}
    >
      Nee
    </button>
  )
}

function setButtonPosition(button, left, top) {
  const windowBox = document.body.getBoundingClientRect()
  const buttonBox = button.getBoundingClientRect()

  if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET
  }
  if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + OFFSET
  }
  if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET
  }
  if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + OFFSET
  }

  button.style.left = `${left}px`
  button.style.top = `${top}px`
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2
}
