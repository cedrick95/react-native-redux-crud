import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { connect } from 'react-redux';
import { postData, deleteData } from '../actions';
import { Button } from '../components/commons';
import AddModal from './addModal';
import UpdateModal from './updateModal';


class TablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['id', 'name', 'update', 'delete' ]
    }
  }

  render() {
    const state = this.state;
    const table = this.props.tableData.map( res => {
        return [
             res.id,
             res.name,
             <UpdateModal dataProps={res} name={res.name} />,
             <Button style={{ width: 60 }} onPress={()=>this.props.deleteData(res.id)}> Delete </Button>,
          ]
      });
    return (
      <ScrollView style={styles.container}>
        <View>
          <AddModal dataProps={this.props.tableData}/>
        </View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#b3e6ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={table} textStyle={styles.text}/>
        </Table>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

const mapStateToProps = state => {
  return { tableData: state.TableReducer }
}

export default connect(mapStateToProps, { deleteData })(TablePage);
