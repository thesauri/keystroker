import * as React from "react";

export interface Props {
    tmp?: string;
}

interface State {
    width: number;
    height: number;
    isTouched: boolean;
    touchX?: number;
    touchY?: number;
}

class PatternLock extends React.Component<Props, State> {
    private canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: Props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            height: 400,
            isTouched: true,
            width: 350
        }
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.touchStart = this.touchStart.bind(this);
    }

    public componentDidMount() {
        this.canvas.current!.addEventListener("touchmove", this.touchMove);
        this.canvas.current!.addEventListener("touchend", this.touchEnd);
        this.canvas.current!.addEventListener("touchcancel", this.touchEnd);
        this.canvas.current!.addEventListener("touchstart", this.touchStart);
    }

    public componentWillUpdate() {
        // tslint:disable-next-line:no-console
        console.log(this.state.touchX + " " + this.state.touchY);
    }

    public componentWillUnmount() {
        this.canvas.current!.removeEventListener("touchmove", this.touchMove);
        this.canvas.current!.removeEventListener("touchend", this.touchEnd);
        this.canvas.current!.addEventListener("touchcancel", this.touchEnd);
        this.canvas.current!.removeEventListener("touchstart", this.touchStart);
    }

    public render() {
        return (
            <canvas
                width={this.state.width}
                height={this.state.height}
                ref={this.canvas} />
        );
    }

    private touchEnd() {
        this.setState({
            isTouched: false
        });
    }

    private touchStart() {
        this.setState({
            isTouched: true
        });
    }

    private touchMove(event: TouchEvent) {
        if (this.state.isTouched) {
            const { left, top } = this.canvas.current!.getBoundingClientRect();
            const touchX = event.targetTouches[0].clientX - left;
            const touchY = event.targetTouches[0].clientY - top;

            if (touchX >= 0 && touchX < this.state.width &&
                touchY >= 0 && touchY < this.state.height) {
                this.setState({
                    touchX,
                    touchY
                });
            }
        }
        event.preventDefault();
    }
}

export default PatternLock;
