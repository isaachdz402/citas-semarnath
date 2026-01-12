import React from "react";

export default function CustomCard({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonColor,
}) {
  return (
    <div className="card-option">
      <div className="icon">
        <Icon size={48} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button style={{ backgroundColor: buttonColor }}>{buttonText}</button>
    </div>
  );
}
