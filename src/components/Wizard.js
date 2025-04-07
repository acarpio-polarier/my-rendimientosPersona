import React, { PureComponent } from "react";
import { View, ScrollView, BackHandler } from "react-native";
import { makeLayoutAnimation } from "../helpers";
export default class Wizard extends PureComponent {
    constructor(props) {
        super(props);
        const { initialStep = 0 } = this.props;

        this.state = {
            step: initialStep,
            scrolling: false,
            prevStep: initialStep
        };
    };

    render() {
        const { steps = [] } = this.props;

        return (
            <ScrollView
                ref={(ref) => this.scrollView = ref}
                horizontal={true}
                snapToAlignment={"center"}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={"never"}
                onScroll={this.handleScroll}
            >
                {steps.map(this.renderStep)}
            </ScrollView>
        )
    };

    handleScroll = (e) => {
        const { width } = this.props;
        const { step } = this.state;

        if (e.nativeEvent.contentOffset.x < (width * step + 1) || e.nativeEvent.contentOffset.x > (width * step - 1)) {
            this.setState({ scrolling: false });
        };
    };

    renderStep = (item, index) => {
        const { width, allowChangeHeight = true } = this.props;
        const { step } = this.state;

        const handleDependsOn = (item.depensOn <= step);
        const handleRenderAlways = (item.renderAlways === true || (item.renderAlways === false && index === step));

        if (handleRenderAlways || handleDependsOn || (item.renderAlways === undefined && item.depensOn === undefined)) {
            if (index === step) {
                return <View key={index} style={{ width }}>
                    {item.content}
                </View>
            }
            return <View key={index} style={[allowChangeHeight && { height: 0 }, { width }]}>
                {item.content}
            </View>
        } else {
            return <View key={index} style={{ width }} />
        };
    };

    componentDidMount() {
        const { currentStep, width, hardwareBackPress = true } = this.props;
        const { step } = this.state;

        currentStep && currentStep(step);
        step !== 0 && this.scrollView.scrollTo({ x: step * width, y: 0, animated: false });

        if (hardwareBackPress) {
            BackHandler.addEventListener("hardwareBackPress", this.prev);
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { currentStep, onChange_isScrolling } = this.props;
        const { step, scrolling } = this.state;

        if (prevState.step !== step) {
            currentStep && currentStep(step);
            this.setState({ prevStep: prevState.step });
        };

        if (prevState.scrolling !== scrolling) {
            onChange_isScrolling && onChange_isScrolling(scrolling);
            this.setState({ prevStep: prevState.step });
        };
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.prev);
    };

    next = () => {
        const { width } = this.props;
        const { step, scrolling } = this.state;

        if (!scrolling) {
            makeLayoutAnimation();
            this.scrollView.scrollTo({ x: step < 0 ? 0 : (step + 1) * width, y: 0, animated: true });
            this.setState({ step: step < 0 ? 0 : (step + 1), scrolling: true });
        };
    };

    prev = () => {
        const { width } = this.props;
        const { step, scrolling } = this.state;

        if (!scrolling && step > 0) {
            makeLayoutAnimation();
            this.scrollView.scrollTo({ x: (step - 1) * width, y: 0, animated: true });
            this.setState({ step: step - 1, scrolling: true });
            return true;
        };

        return false;
    };

    goTo = (step) => {
        const { width } = this.props;
        const { scrolling, step: currentStep } = this.state;

        // Comprobar si el nuevo step es diferente del actual
        if (currentStep !== step) {
            if (!scrolling) {
                makeLayoutAnimation();
                this.scrollView.scrollTo({ x: step <  0 ?  0 : step * width, y:  0, animated: true });
                this.setState({ step: step <  0 ?  0 : step, scrolling: true });
            }
        }  
    };
};
