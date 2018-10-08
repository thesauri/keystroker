import * as React from "react";
import "./Dialog.css";

interface ButtonProps {
    text: string;
    onClick: () => any;
}

export interface Props {
    title: string;
    children: React.ReactNode;
    back?: ButtonProps;
    next: ButtonProps;
    notification?: string;
}

const Dialog = ({ title, children, back, next, notification }: Props) => (
    <div className="section">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child notification is-primary">
                <p className="title">
                    {title}
                </p>
                { notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
                {children}
                </div>
            </div>
        </div>
        <footer className="Dialog-footer navbar is-fixed-bottom">
            { back &&
                <button
                    className="button Dialog-button has-background-dark is-link"
                    onClick={back.onClick}>
                    {back.text}
                </button>
            }
            <button
                className="button Dialog-button has-background-primary is-link"
                onClick={next.onClick}>
                    {next.text}
                </button>
            </footer>
    </div>
);

export default Dialog;
