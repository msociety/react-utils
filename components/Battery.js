import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const BORDER_COLOR = '#444';

const batteryBreakpoints = {
  LOW: 20,
  MIDDLE: 50,
  HIGH: 80
};

const batteryStatusColors = {
  FULL: '#6d8f00',
  HIGH: '#98c121',
  LOW: '#f49719',
  EMPTY: '#dd3f0e'
};

const getBarsColor = level => {
  if (level > batteryBreakpoints.HIGH) return batteryStatusColors.FULL;
  if (level > batteryBreakpoints.MIDDLE) return batteryStatusColors.HIGH;
  if (level >= batteryBreakpoints.LOW) return batteryStatusColors.LOW;
  return batteryStatusColors.EMPTY;
};

const Container = styled.div`
  width: 100%;
`;

const Battery = ({
  level,
  width,
  aspectRatio,
  borderWidth,
  gap,
  innerRadius,
  poleWidth,
  ...props
}) => {
  const boxWidth = width - poleWidth;
  const height = width * aspectRatio;
  const barWidth = (boxWidth - borderWidth * 2 - gap * 5) / 4;
  const barHeight = height - borderWidth * 2 - gap * 2;
  const poleHeight = height / 3;
  return (
    <Container {...props}>
      <svg
        version="1.1"
        id="battery"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox={`0 0 ${width} ${height}`}
        xmlSpace="preserve"
        fill={BORDER_COLOR}
      >
        <g transform={`translate(${boxWidth - 1}, ${Math.round(height / 2) - poleHeight / 2})`}>
          <rect x={0} y={0} width={poleWidth} height={poleHeight} />
          <circle cx={0} cy={0} r={poleWidth} />
          <circle cx={0} cy={poleHeight} r={poleWidth} />
        </g>
        <rect
          x="0"
          y="0"
          rx={borderWidth + gap + innerRadius}
          ry={borderWidth + gap + innerRadius}
          width={boxWidth}
          height={height}
        />
        <rect
          x={borderWidth}
          y={borderWidth}
          rx={gap + innerRadius}
          ry={gap + innerRadius}
          width={boxWidth - borderWidth * 2}
          height={height - borderWidth * 2}
          fill="white"
        />
        <g
          transform={`translate(${borderWidth + gap}, ${borderWidth + gap})`}
          fill={getBarsColor(level)}
        >
          <g>
            <path
              d={`
              M ${innerRadius} 0
              H ${barWidth}
              V ${barHeight}
              H ${innerRadius}
              V ${barHeight - innerRadius}
              H 0
              V ${innerRadius}
              H ${innerRadius}
              V 0
              Z
            `}
            />
            <circle cx={innerRadius} cy={innerRadius} r={innerRadius} />
            <circle cx={innerRadius} cy={barHeight - innerRadius} r={innerRadius} />
          </g>
          <rect
            x={barWidth + gap}
            y={0}
            width={barWidth}
            height={barHeight}
            visibility={level > batteryBreakpoints.LOW ? 'visible' : 'hidden'}
          />
          <rect
            x={gap * 2 + barWidth * 2}
            y={0}
            width={barWidth}
            height={barHeight}
            visibility={level > batteryBreakpoints.MIDDLE ? 'visible' : 'hidden'}
          />
          <g visibility={level > batteryBreakpoints.HIGH ? 'visible' : 'hidden'}>
            <path
              d={`
              M ${gap * 3 + barWidth * 3} 0
              H ${gap * 3 + barWidth * 4 - innerRadius}
              V ${innerRadius}
              H ${gap * 3 + barWidth * 4}
              V ${barHeight - innerRadius}
              H ${gap * 3 + barWidth * 4 - innerRadius}
              V ${barHeight}
              H ${gap * 3 + barWidth * 3}
              V 0
              Z
            `}
            />
            <circle
              cx={(barWidth + gap) * 3 + barWidth - innerRadius}
              cy={innerRadius}
              r={innerRadius}
            />
            <circle
              cx={(barWidth + gap) * 3 + barWidth - innerRadius}
              cy={barHeight - innerRadius}
              r={innerRadius}
            />
          </g>
        </g>
      </svg>
    </Container>
  );
};

Battery.propTypes = {
  level: PropTypes.number.isRequired,
  width: PropTypes.number,
  aspectRatio: PropTypes.number,
  borderWidth: PropTypes.number,
  gap: PropTypes.number,
  innerRadius: PropTypes.number,
  poleWidth: PropTypes.number
};

Battery.defaultProps = {
  width: 500,
  aspectRatio: 3 / 5,
  borderWidth: 12,
  gap: 18,
  innerRadius: 20,
  poleWidth: 25
};

export default Battery;
