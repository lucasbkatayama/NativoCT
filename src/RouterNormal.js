import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from './components/Home';
import ExerciseRecord from './components/ExerciseRecord';
import StudentEditProfile from './components/StudentEditProfile';
import MarkClass from './components/MarkClass';
import ClassHoursView from './components/ClassHoursView';
import Payments from './components/Payments';

const RouterNormal = () => {
  return (
    <Router>
      <Scene key="root" >
          <Scene
            key="home"
            component={Home}
            initial
            hideNavBar
          />
        <Scene
          key='studentExerciseRecord'
          component={ExerciseRecord}
          hideNavBar
        />
        <Scene
          key='studentEditProfile'
          component={StudentEditProfile}
          hideNavBar
        />
        <Scene
          key='markClass'
          component={MarkClass}
          hideNavBar
        />
        <Scene
          key='classHoursView'
          component={ClassHoursView}
          hideNavBar
        />
        <Scene
          key='payments'
          component={Payments}
          hideNavBar
        />
      </Scene>
    </Router>
  );
};

export default RouterNormal;
