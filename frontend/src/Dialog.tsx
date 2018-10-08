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
    <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {title}
                    </h1>
                </div>
            </div>
        </section>
        <section className="section">
            <div className="container">
                { notification &&
                    <div className="notification is-danger">
                        {notification}
                    </div>
                }
                {children}
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
        </section>
    </div>
);

export default Dialog;
