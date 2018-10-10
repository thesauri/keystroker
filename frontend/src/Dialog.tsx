import * as React from "react";
import "./Dialog.css";

interface ButtonProps {
    text: string;
    onClick: () => any;
    disabled?: boolean;
}

export interface Props {
    title: string;
    children: React.ReactNode;
    back?: ButtonProps;
    next?: ButtonProps;
    notification?: string;
}

class Dialog extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    public componentDidMount() {
        document.addEventListener("keypress", this.onKeyPress);
    }

    public componentWillUnmount() {
        document.removeEventListener("keypress", this.onKeyPress);
    }

    public render() {
        return (
            <div className="Dialog-root">
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                {this.props.title}
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="container Dialog-content">
                    { this.props.notification &&
                        <div className="Dialog-notification notification is-danger">
                            {this.props.notification}
                        </div>
                    }
                    {this.props.children}
                </div>
                <footer className="Dialog-footer">
                    { this.props.back &&
                        <button
                            className="button Dialog-button has-background-dark is-link"
                            onClick={this.props.back.onClick}>
                            {this.props.back.text}
                        </button>
                    }
                    { this.props.next &&
                        <button
                            className="button Dialog-button has-background-primary is-link"
                            onClick={this.props.next.onClick}
                            disabled={this.props.next.disabled}>
                                {this.props.next.text}
                        </button>
                    }
                </footer>
            </div>
        );
    }

    private onKeyPress(event: KeyboardEvent)  {
        if (event.key === "Enter" && this.props.next) {
            this.props.next.onClick();
        }
    }
}

export default Dialog;
