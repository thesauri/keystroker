import * as React from "react";
import { Vector2d } from './Vector2d';

export interface Props {
    pointRadius: number;
}

interface State {
    width: number;
    height: number;
    isTouched: boolean;
    currentPosition?: Vector2d;
    startPosition?: Vector2d;
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
        this.updateCanvas();
    }

    public componentWillUpdate() {
        this.updateCanvas();
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

    private updateCanvas() {
        const context = this.canvas.current!.getContext("2d")!;
        context.clearRect(0, 0, this.state.width, this.state.height);

        this.drawPoints(context);

        if (this.state.startPosition && this.state.currentPosition) {
            context.beginPath();
            context.moveTo(this.state.startPosition.x, this.state.startPosition.y);
            context.lineTo(this.state.currentPosition.x, this.state.currentPosition.y);
            context.stroke();
        }
    }

    private drawPoints(context: CanvasRenderingContext2D) {
        for (let pointIndex = 0; pointIndex < 9; pointIndex++) {
            const { x, y } = this.pointPosition(pointIndex);

            context.beginPath();
            context.arc(x, y, this.props.pointRadius, 0, 2 * Math.PI);
            context.fill();
        }
    }

    private pointPosition(pointIndex: number): Vector2d {
        const x = (2 * (pointIndex % 3) + 1) * (this.state.width / 6.0);
        const y = (2 * Math.floor(pointIndex / 3) + 1) * (this.state.height / 6.0);
        return new Vector2d(x, y);
    }

    private pointToPointIndex(point: Vector2d): number {
        const findNearestPointIndex = (pointIndex: number = 8, nearestIndex?: number, nearestDistance?: number): [number, number] => {
            if (pointIndex < 0) {
                return [nearestIndex!, nearestDistance!];
            }
            const position = this.pointPosition(pointIndex);
            const distance = Math.pow(point.x - position.x, 2) + Math.pow(point.y - position.y, 2);
            if (!nearestDistance || distance < nearestDistance) {
                return findNearestPointIndex(pointIndex - 1, pointIndex, distance);
            } else {
                return findNearestPointIndex(pointIndex - 1, nearestIndex, nearestDistance);
            }
        }

        return findNearestPointIndex()[0];
    }

    private touchEnd() {
        this.setState({
            currentPosition: undefined,
            isTouched: false,
            startPosition: undefined
        });
    }

    private touchStart(event: TouchEvent) {
        const touchStartPosition = this.clientToCanvasCoordinates(
            event.targetTouches[0].clientX,
            event.targetTouches[0].clientY
        );
        const startingPointIndex = this.pointToPointIndex(touchStartPosition);
        const startingPoint = this.pointPosition(startingPointIndex);
        this.setState({
            isTouched: true,
            startPosition: startingPoint
        });
    }

    private clientToCanvasCoordinates(clientX: number, clientY: number) {
        const { left, top } = this.canvas.current!.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        return new Vector2d(x, y);
    }

    private touchMove(event: TouchEvent) {
        if (this.state.isTouched) {
            const currentPosition = this.clientToCanvasCoordinates(
                event.targetTouches[0].clientX,
                event.targetTouches[0].clientY
            );

            if (currentPosition.x >= 0 && currentPosition.x < this.state.width &&
                currentPosition.y >= 0 && currentPosition.y < this.state.height) {
                this.setState({ currentPosition });
            }
        }
        event.preventDefault();
    }
}

export default PatternLock;
