import React, { useState } from 'react';
import { Input, Segment, Header, Grid, Button, Message, Label  } from 'semantic-ui-react';

export interface IPops {
  ww: number
}
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
    arreglo: ['#','#','#','#','#','#','#','#','#','#','#'],
    apuntador: 1,
    error: false,
    success: false
  });
  
  const onCargar = () => {
    setState({
      ...state,
      arreglo: ('#' + state.cadena + '#########').split(''),
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
  const reiniciar = () => {
    setState({
      ...state,
      cadena: '',
      arreglo: '###########'.split(''),
      estado: 0,
      apuntador: 1,
      error: false,
      success: false
    })
  }
  return (
    <Segment style={{ textAlign: 'center' }}>
      {state.success ?
        <Message positive>
          <Message.Header>Felicidades haz decifrado el mensaje</Message.Header>
            <p>
              Haz derrotado a los NAZIS
            </p>
          </Message>
        : null}
      {state.error ?
        <Message negative>
          <Message.Header>CARACTER INCORRECTO</Message.Header>
            <p>
              Los NAZIS te llevan la delantera!
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
            ...state,
            cadena : event.currentTarget.value.length < 10 ? event.currentTarget.value.toUpperCase() : state.cadena
          })
        }
      />
      <br/>
      <Grid>
        <Grid.Row style={{ marginLeft: props.ww < 700 ? '0%' : '20%', marginTop: '20px' }} >
          <br/>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color='teal'
            >
              {'#'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[1] !== '#' ? 'red' : state.success && state.arreglo[1] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[1]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[2] !== '#' ? 'red' : state.success && state.arreglo[2] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[2]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[3] !== '#' ? 'red' : state.success && state.arreglo[3] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[3]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[4] !== '#' ? 'red' : state.success && state.arreglo[4] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[4]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[5] !== '#' ? 'red' : state.success && state.arreglo[5] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[5]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[6] !== '#' ? 'red' : state.success && state.arreglo[6] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[6]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[7] !== '#' ? 'red' : state.success && state.arreglo[7] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[7]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[8] !== '#' ? 'red' : state.success && state.arreglo[8] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[8]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.error && state.arreglo[9] !== '#' ? 'red' : state.success && state.arreglo[9] !== '#' ? 'green' : 'teal'}
            >
              {state.arreglo[9]}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color='teal'
            >
              {'#'}
            </Label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginLeft: props.ww < 700 ? '0%' : '20%', marginTop: '20px' }} >
          <br/>
          <Grid.Column style={{ marginRight: '5px' }}>
            <Label
              size='big'
              color='teal'
            >
              {'-'}
            </Label>
            
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px' }}>
            <Label
              size='big'
              color={state.apuntador === 1 ? 'green' : undefined}
            >
              {state.apuntador === 1 ? '^' : '-'}
            </Label>
            
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 2 ? 'green' : undefined}
            >
              {state.apuntador === 2 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 3 ? 'green' : undefined}
            >
              {state.apuntador === 3 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 4 ? 'green' : undefined}
            >
              {state.apuntador === 4 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 5 ? 'green' : undefined}
            >
              {state.apuntador === 5 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 6 ? 'green' : undefined}
            >
              {state.apuntador === 6 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 7 ? 'green' : undefined}
            >
              {state.apuntador === 7 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 8 ? 'green' : undefined}
            >
              {state.apuntador === 8 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color={state.apuntador === 9 ? 'green' : undefined}
            >
              {state.apuntador === 9 ? '^' : '-'}
            </Label>
          </Grid.Column>
          <Grid.Column style={{ marginRight: '5px'}}>
            <Label
              size='big'
              color='teal'
            >
              {'-'}
            </Label>
          </Grid.Column>
        </Grid.Row>
        
      </Grid>
      <br />
      {(state.error || state.success) ?
        <Button
          color='teal'
          size='big'
          onClick={() => reiniciar()}
        >
            Reiniciar
        </Button>
        :
        <Button
          color='teal'
          size='big'
          onClick={() => nextStep()}
        >
            Paso a paso
        </Button>
      }
    </Segment>
  )
}

export default TuringMachine;