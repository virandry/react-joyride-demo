import React, { Component } from "react";
import PropTypes from "prop-types";
import Joyride from "react-joyride";
import styled, { keyframes } from "styled-components";

import Grid from "./Grid";

const Wrapper = styled.div`
  background-color: #ccc;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 50px;
`;

const TooltipBody = styled.div`
  background-color: #daa588;
  min-width: 290px;
  max-width: 420px;
  padding-bottom: 3rem;
`;

const TooltipContent = styled.div`
  color: #fff;
  padding: 20px;
`;

const TooltipTitle = styled.h2`
  color: #fff;
  padding: 20px;
  margin: 0;
`;

const TooltipFooter = styled.div`
  background-color: #f56960;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  * + * {
    margin-left: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #e11b0e;
  color: #fff;
`;

const Input = styled.input`
  padding: 1.2rem;
  width: 75%;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  55% {
    background-color: rgba(255, 100, 100, 0.9);
    transform: scale(1.6);
  }
`;

const Beacon = styled.span`
  animation: ${pulse} 1s ease-in-out infinite;
  background-color: rgba(255, 27, 14, 0.6);
  border-radius: 50%;
  display: inline-block;
  height: 3rem;
  width: 3rem;
`;

const Tooltip = ({
  content,
  continuous,
  backProps,
  closeProps,
  index,
  isLastStep,
  locale,
  primaryProps,
  setTooltipRef,
  size,
  skipProps,
  title
}) => (
  <TooltipBody innerRef={setTooltipRef}>
    {title && <TooltipTitle>{title}</TooltipTitle>}
    {content && <TooltipContent>{content}</TooltipContent>}
    <TooltipFooter>
      {index > 0 && <Button {...backProps}>{locale.back}</Button>}
      {continuous && <Button {...primaryProps}>{locale.next}</Button>}
      {!continuous && <Button {...closeProps}>{locale.close}</Button>}
    </TooltipFooter>
  </TooltipBody>
);

class Custom extends Component {
  state = {
    beaconComponent: props => <Beacon {...props} />,
    run: true,
    steps: [
      {
        content: (
          <div>
            <h5 style={{ marginTop: 0 }}>Weekly magic on your inbox</h5>
            <Input type="email" placeholder="Type your email" />
            <button>YES</button>
          </div>
        ),
        placement: "bottom",
        placementBeacon: "top",
        target: ".image-grid div:nth-child(1)",
        textAlign: "center",
        title: "Our awesome projects"
      },
      {
        content:
          "Can be advanced by clicking an element through the overlay hole.",
        disableCloseOnEsc: true,
        disableOverlayClicks: true,
        placement: "bottom",
        target: ".image-grid div:nth-child(2)",
        title: "Our Mission"
      },
      {
        content: "This step tests what happens when a target is missing",
        placement: "top",
        target: ".image-grid div:nth-child(4)",
        title: "The good stuff"
      },
      {
        content: (
          <div>
            <svg
              width="96px"
              height="96px"
              viewBox="0 0 96 96"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        target: ".image-grid div:nth-child(5)",
        placement: "right",
        title: "We are the people"
      },
      {
        content: "Because sometimes you don't really need a proper heading",
        target: ".image-grid div:nth-child(3)",
        placement: "left",
        isFixed: true
      }
    ],
    styles: {
      options: {
        arrowColor: "#DAA588"
      },
      overlay: {
        backgroundColor: "rgba(79, 46, 8, 0.5)"
      }
    },
    locale: {
      back: "Arrière",
      close: "Fermer",
      last: "Dernier",
      next: "Prochain",
      open: "Ouvrir",
      skip: "Sauter"
    },
    tooltipComponent: Tooltip,
    floaterProps: {
      wrapperOptions: {
        offset: -15
      }
    }
  };

  static propTypes = {
    joyride: PropTypes.shape({
      callback: PropTypes.func
    })
  };

  static defaultProps = {
    joyride: {}
  };

  handleClickStart = e => {
    e.preventDefault();

    this.setState({
      run: true,
      stepIndex: 0
    });
  };

  handleClickNextButton = () => {
    const { stepIndex } = this.state;

    if (this.state.stepIndex === 1) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  };

  handleJoyrideCallback = data => {
    const { joyride } = this.props;
    const { type } = data;

    if (typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      console.group(type);
      console.log(data); //eslint-disable-line no-console
      console.groupEnd();
    }
  };

  render() {
    const joyrideProps = {
      ...this.state,
      ...this.props.joyride
    };

    return (
      <Wrapper>
        <Joyride
          scrollToFirstStep
          showSkipButton
          {...joyrideProps}
          callback={this.handleJoyrideCallback}
        />
        <Grid />
      </Wrapper>
    );
  }
}

export default Custom;
