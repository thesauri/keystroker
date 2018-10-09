import * as React from "react";
import { Vector2d } from './Vector2d';

export interface Props {
    width: number;
    height: number;
    onPatternEntered: (pattern: number[]) => any;
    pointRadius: number;
}

interface State {
    isTouched: boolean;
    currentPosition?: Vector2d;
    enteredIndices: number[];
}

class PatternLock extends React.Component<Props, State> {
    private canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: Props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            enteredIndices: [],
            isTouched: true
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

    public componentDidUpdate() {
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
                width={this.props.width}
                height={this.props.height}
                ref={this.canvas} />
        );
    }

    private updateCanvas() {
        const context = this.canvas.current!.getContext("2d")!;
        context.clearRect(0, 0, this.props.width, this.props.height);
        context.fillStyle = "#363636";
        context.strokeStyle = "#363636";

        this.drawPoints(context);

        if (this.state.enteredIndices.length > 0 && this.state.currentPosition) {
            const lastPositionIndex = this.state.enteredIndices[this.state.enteredIndices.length - 1];
            const startPosition = this.pointPosition(lastPositionIndex);
            context.beginPath();
            context.moveTo(startPosition.x, startPosition.y);
            context.lineTo(this.state.currentPosition.x, this.state.currentPosition.y);
            context.stroke();

            this.drawEnteredPoints(context);
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

    private drawEnteredPoints(context: CanvasRenderingContext2D) {
        for (let i = 0; i <= this.state.enteredIndices.length - 2; i++) {
            const fromPosition = this.pointPosition(this.state.enteredIndices[i]);
            const toPosition = this.pointPosition(this.state.enteredIndices[i + 1]);
            context.beginPath();
            context.moveTo(fromPosition.x, fromPosition.y);
            context.lineTo(toPosition.x, toPosition.y);
            context.stroke();
        }

    }

    private pointPosition(pointIndex: number): Vector2d {
        const x = (2 * (pointIndex % 3) + 1) * (this.props.width / 6.0);
        const y = (2 * Math.floor(pointIndex / 3) + 1) * (this.props.height / 6.0);
        return new Vector2d(x, y);
    }

    private pointToPointIndex(point: Vector2d, threshold: number = 1000): number | undefined {
        const findNearestPointIndex = (pointIndex: number = 8, nearestIndex?: number, nearestDistance?: number): [number?, number?] => {
            if (pointIndex < 0) {
                return [nearestIndex, nearestDistance];
            }
            const position = this.pointPosition(pointIndex);
            const distance = Math.pow(point.x - position.x, 2) + Math.pow(point.y - position.y, 2);
            if (distance <= threshold && (!nearestDistance || distance < nearestDistance)) {
                return findNearestPointIndex(pointIndex - 1, pointIndex, distance);
            } else {
                return findNearestPointIndex(pointIndex - 1, nearestIndex, nearestDistance);
            }
        }

        return findNearestPointIndex()[0];
    }

    private touchEnd(event: TouchEvent) {
        this.props.onPatternEntered(this.state.enteredIndices);
        this.setState({
            currentPosition: undefined,
            enteredIndices: [],
            isTouched: false
        });
    }

    private touchStart(event: TouchEvent) {
        const touchStartPosition = this.clientToCanvasCoordinates(
            event.targetTouches[0].clientX,
            event.targetTouches[0].clientY
        );
        const startIndex = this.pointToPointIndex(touchStartPosition);
        if (startIndex !== undefined) {
            this.setState({
                enteredIndices: [startIndex],
                isTouched: true
            });
        }
    }

    private clientToCanvasCoordinates(clientX: number, clientY: number) {
        const { left, top } = this.canvas.current!.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        return new Vector2d(x, y);
    }

    private touchMove(event: TouchEvent) {
        event.preventDefault();

        if (!this.state.isTouched) {
            return;
        }

        const currentPosition = this.clientToCanvasCoordinates(
            event.targetTouches[0].clientX,
            event.targetTouches[0].clientY
        );
        this.setState({
            currentPosition
        });

        if (currentPosition.x < 0 || currentPosition.x >= this.props.width &&
            currentPosition.y < 0 && currentPosition.y >= this.props.height) {
            return;
        }

        const endIndex = this.pointToPointIndex(currentPosition);
        const lastIndex = this.state.enteredIndices[this.state.enteredIndices.length - 1];
        if (endIndex === undefined || endIndex === lastIndex) {
            return;
        }

        const newEnteredIndices = [...this.state.enteredIndices, endIndex];
        this.setState({
            enteredIndices: newEnteredIndices
        });
    }
}

export default PatternLock;
