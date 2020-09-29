import React, { useState } from 'react';
import { Input, Segment, Header, Grid, Button, Message  } from 'semantic-ui-react';

export interface IPops {}
export interface ITutingMachineState {
  cadena: string;
  estado: number;
  arreglo: string[];
  apuntador: number;
  error: boolean;
  success: boolean;
}

const TuringMachine: React.FunctionComponent<IPops> = props => {
  const [state, setState] = useState<ITutingMachineState>({
    cadena: '',
    estado: 0,
    arreglo: [],
    apuntador: 1,
    error: false,
    success: false
  });
  
  const onCargar = () => {
    setState({
      ...state,
      arreglo: ('#' + state.cadena + '#').split(''),
      estado: 0,
      apuntador: 1,
      error: false,
      success: false
    })
  }

  const estadoQ0 = () => {
    if (state.arreglo[state.apuntador] === '1') {
      state.arreglo[state.apuntador] = 'X';
      state.apuntador++;
      setState({ ...state, estado: 1 })
    } else if (state.arreglo[state.apuntador] === 'B') {
      state.apuntador++;
      setState({ ...state, estado: 3 })
    } else {
      setState({ ...state, error: true })
    }
  }
  const estadoQ1 = () => {
    if (state.arreglo[state.apuntador] === '1') {
      state.apuntador++;
      setState({...state, estado: 1})
    } else if (state.arreglo[state.apuntador] === 'B') {
      state.arreglo[state.apuntador] = 'B';
      state.apuntador++;
      setState({...state, estado: 1})
    } else if (state.arreglo[state.apuntador] === 'A') {
      state.arreglo[state.apuntador] = 'B';
      state.apuntador--;
      setState({...state, estado: 2})
    } else {
      setState({ ...state, error: true })
    }
  }
  const estadoQ2 = () => {
    if (state.arreglo[state.apuntador] === '1') {
      state.apuntador--;
      setState({...state, estado: 2})
    } else if (state.arreglo[state.apuntador] === 'B') {
      state.apuntador--;
      setState({...state, estado: 2})
    } else if (state.arreglo[state.apuntador] === 'X') {
      state.arreglo[state.apuntador] = '1';
      state.apuntador++;
      setState({...state, estado: 0})
    } else {
      setState({ ...state, error: true })
    }
  }
  const estadoQ3 = () => {
    if (state.arreglo[state.apuntador] === 'A') {
      state.apuntador++;
      setState({...state, estado: 3})
    } else if (state.arreglo[state.apuntador] === 'B') {
      state.apuntador++;
      setState({...state, estado: 3})
    } else if (state.arreglo[state.apuntador] === '#') {
      state.apuntador++;
      setState({...state, estado: 4})
    } else {
      setState({ ...state, error: true })
    }
  }
  const estadoQ4 = () => {
    setState({...state, success: true})
  }
  const nextStep = () => {
    switch (state.estado) {
      case 0: {
        estadoQ0();
        break;
      }
      case 1: {
        estadoQ1();
        break;
      }
      case 2: {
        estadoQ2();
        break;
      }
      case 3: {
        estadoQ3();
        break;
      }
      case 4: {
        estadoQ4();
        break;
      }
    }
  }
  return (
    <Segment style={{ textAlign: 'center' }}>
      {state.success ?
        <Message positive>
          <Message.Header>You are eligible for a reward</Message.Header>
            <p>
              Go to your <b>special offers</b> page to see now.
            </p>
          </Message>
        : null}
      {state.error ?
        <Message negative>
          <Message.Header>You are eligible for a reward</Message.Header>
            <p>
              Go to your <b>special offers</b> page to see now.
            </p>
          </Message>
        : null}
      <Header>TURING MACHINE by Vladimir</Header>
      <Header style={{ fontSize: '80px'}}>
        <Header.Content>{state.estado}</Header.Content>
        <Header.Subheader>ESTADO</Header.Subheader>
      </Header>
      
      <Input
        action={{
          color: 'teal',
          labelPosition: 'right',
          icon: 'download',
          content: 'CARGAR',
          onClick: () => onCargar()
        }}
        placeholder='Ingresa la cadena'
        size='big'
        value={state.cadena.toUpperCase()}
        onChange={
          event => setState({
            ...state, cadena: event.currentTarget.value.toUpperCase()
          })
        }
      />
      <br/>
      <Grid>
        <Grid.Row style={{ marginLeft: '20%', marginTop: '20px' }} >
          <br/>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[0] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[1] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[2] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[3] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[4] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[5] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[6] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[7] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[8] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[9] : '#'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched>
            <Input
              style={{ weight: '10px'}}
              placeholder='#'
              value={state.arreglo ? state.arreglo[10] : '#'}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginLeft: '20%', marginTop: '20px' }} >
          <br/>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 1 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 2 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 3 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 4 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 5 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 6 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 7 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 8 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
              value={state.apuntador === 9 ? '^' : '- -'}
            />
          </Grid.Column>
          <Grid.Column largeScreen={1} stretched >
            <Input
              style={{ weight: '10px'}}
              placeholder='- -'
            />
          </Grid.Column>
        </Grid.Row>
        
      </Grid>
      <br />
      {(!state.error || !state.success) ?
      <Button
        color='teal'
        size='big'
        onClick={() => nextStep()}
      >
          Paso a paso
      </Button>
      :
      <Button
        color='teal'
        size='big'
        onClick={() => nextStep()}
      >
          Reiniciar
      </Button>
      }
    </Segment>
  )
}

export default TuringMachine;