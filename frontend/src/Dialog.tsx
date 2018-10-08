import * as React from 'react';

export interface Props {
    title: string;
    children: React.ReactNode;
}

const Dialog = ({ title, children }: Props) => (
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
    </div>
);

export default Dialog;
