import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
  state = {
    type: RNCamera.Constants.Type.back,
  }

  flipCamera = () => {
    this.setState({ 
      type: this.state.type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
    })
  }

  takePicture = async function() {
    let back = false
    this.state.type === RNCamera.Constants.Type.back ? back = true : back = false
    if (this.camera) {
      const options = { quality: 0.5, width:800, height:800, fixOrientation: true};
      const data = await this.camera.takePictureAsync(options)
      if(data){
        this.props.navigation.navigate('AddPost',{
          image: data.uri, back
        })
      }
    }
  };

  render() {
    const { type } = this.state
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={type}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
       
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
       
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>

         <View style={{justifyContent: 'flex-end',}}>
          <TouchableOpacity onPress={this.flipCamera} style={styles.capture}>
            <Text style={{fontSize: 14}}> Flip </Text>
          </TouchableOpacity>
        </View>

        </View>
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

