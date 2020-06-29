import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Main from '../Main';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
describe('Settings screen', () => {
  const handleOpenUrl = jest.fn();
  const handleConnect = jest.fn();
  const loading = false;

  it('should have button that connects to weos', async () => {
    const initialState = {
      user: null,
    };
    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light}}>
          <Main
            handleConnect={handleConnect}
            handleOpenUrl={handleOpenUrl}
            loading={loading}
            componentState={initialState}
          />
        </ApplicationProvider>
      </>,
    );
    const connectButton = getAllByTestId('WeOsConnectBtn');
    expect(connectButton).toHaveLength(1);
    unmount();
  });

  it('should connect to weos if weos connect button is pressed', () => {
    const initialState = {
      user: null,
    };
    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light}}>
          <Main
            handleConnect={handleConnect}
            handleOpenUrl={handleOpenUrl}
            loading={loading}
            componentState={initialState}
          />
        </ApplicationProvider>
      </>,
    );
    const connectButton = getAllByTestId('WeOsConnectBtn');
    expect(connectButton).toHaveLength(1);
    fireEvent.press(connectButton[0]);
    expect(handleConnect).toHaveBeenCalled();
    unmount();
  });

  it('should show logged-in account email', () => {
    const initialState = {
      user: {
        sub: {
          email: 'joe.doe@gmail.com',
        },
      },
    };
    const {getAllByTestId, unmount} = render(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light}}>
          <Main
            handleConnect={handleConnect}
            handleOpenUrl={handleOpenUrl}
            loading={loading}
            componentState={initialState}
          />
        </ApplicationProvider>
      </>,
    );

    const AccountEmail = getAllByTestId('AccountEmail');
    expect(AccountEmail).toHaveLength(1);
    unmount();
  });
});
