import styled from "styled-components";

const LabelEl = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SpanEl = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const InputEl = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${SpanEl} {
    background-color: #2196f3;
  }
  &:focus + ${SpanEl} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${SpanEl}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const ToggleCheckbox = ({ ...rest }) => {
  return (
    <LabelEl>
      <InputEl {...rest} /> <SpanEl />
    </LabelEl>
  );
};

export default ToggleCheckbox;
