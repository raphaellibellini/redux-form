const If = (props) => {
    return props.condition ? (props.children ? props.children : '') : null;
};

export default If;