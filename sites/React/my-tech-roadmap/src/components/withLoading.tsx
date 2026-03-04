import React from 'react';

export interface WithLoadingProps{
  isLoading_i: boolean,
  onLoaded_i: () => void,
  toReload_i: () => void,
}

export const withLoading = <P extends WithLoadingProps>(Component: React.ComponentType<P>) => {

  type CleanProps = Omit < P, keyof WithLoadingProps>

  type State = {
    isLoading: boolean,
  }

  return class extends React.PureComponent<CleanProps, State>{

    constructor(props: CleanProps) {
      super(props)

      this.state = {
        isLoading: true,
      }

      this._handleOnLoad = this._handleOnLoad.bind(this)
      this._handleToReload = this._handleToReload.bind(this)
    }

    _handleOnLoad() {
      this.setState({
        isLoading: false,
      });
    }
    
    _handleToReload() {
      this.setState({
        isLoading: true,
      });
    }

    render() {
      return (
        <Component
          {...(this.props as P)}
          isLoading_i={this.state.isLoading}
          onLoaded_i={this._handleOnLoad}
          toReload_i={this._handleToReload}
        />
      )
    }
  }
}