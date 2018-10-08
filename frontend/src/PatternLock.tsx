import * as React from "react";

export interface Props {
    tmp?: string;
}

interface State {
    width: number;
    height: number;
}

class PatternLock extends React.Component<Props, State> {
    private canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: Props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            height: 400,
            width: 350
        }
    }

    public render() {
        return (
            <canvas
                width={this.state.width}
                height={this.state.height}
                ref={this.canvas} />
        );
    }
}

export default PatternLock;
