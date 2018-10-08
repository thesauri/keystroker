import * as React from 'react';

export interface Props {
    title: string;
    children: React.ReactNode;
    backText?: string;
    nextText: string;
}

const Dialog = ({ title, children, backText, nextText }: Props) => (
    <div className="section">
        <div className="tile is-ancestor">
            <div className="tile is-parent">
                <div className="tile is-child notification is-primary">
                <p className="title">
                    {title}
                </p>
                {children}
                </div>
            </div>
        </div>
        <footer className="App-footer navbar is-fixed-bottom">
            { backText &&
                <button className="button has-background-dark is-link">
                    {backText}
                </button>
            }
            <button className="button has-background-primary is-link">
                {nextText}
            </button>
        </footer>
    </div>
);

export default Dialog;
