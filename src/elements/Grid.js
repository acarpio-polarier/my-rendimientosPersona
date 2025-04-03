import React from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';

const numColumns = 3;
export default class Grid extends React.Component {
    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View style={styles.item} >
                {this.props.renderItem(item)}
            </View>
        );
    };

    render() {
        const { data, numColumns } = this.props;
        return (
            <FlatList
                data={formatData(data, numColumns)}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
        );
    }
}

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
});