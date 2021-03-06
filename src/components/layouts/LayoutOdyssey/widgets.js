import React, {Component} from "react";
import {withApollo} from "react-apollo";
import gql from "graphql-tag.macro";
import {Widgets} from "components/views";
import {Tooltip} from "helpers/reactstrap";

import {Widget} from "../LayoutCorners/Widgets";
import useSoundEffect from "../../../helpers/hooks/useSoundEffect";
import {FaQuestionCircle, FaSignOutAlt} from "react-icons/fa";
import {kebabCase} from "change-case";
const WIDGET_NOTIFY = gql`
  subscription WidgetNotify($simulatorId: ID!, $station: String) {
    widgetNotify(simulatorId: $simulatorId, station: $station)
  }
`;

class WidgetsContainer extends Component {
  state = {
    widgetNotify: {},
  };
  constructor(props) {
    super(props);
    const self = this;
    this.subscription = this.props.client
      .subscribe({
        query: WIDGET_NOTIFY,
        variables: {
          simulatorId: this.props.simulator.id,
          station: this.props.station.name,
        },
      })
      .subscribe({
        next({data}) {
          const {widgetNotify} = data;
          self.setNotify(widgetNotify, true);
        },
        error(err) {
          console.error("err", err);
        },
      });
  }
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
  }
  setNotify = (widget, state) => {
    this.setState({
      widgetNotify: Object.assign({}, this.state.widgetNotify, {
        [widget]: state,
      }),
    });
  };
  startTraining = () => {
    const client = this.props.clientObj.id;
    const variables = {
      client,
      training: true,
    };
    const mutation = gql`
      mutation ClientSetTraining($client: ID!, $training: Boolean!) {
        clientSetTraining(client: $client, training: $training)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables,
    });
  };
  logout = () => {
    const client = this.props.clientObj.id;
    const obj = {
      client,
    };
    const mutation = gql`
      mutation LogoutClient($client: ID!) {
        clientLogout(client: $client)
      }
    `;
    this.props.client.mutate({
      mutation: mutation,
      variables: obj,
    });
  };
  render() {
    const {simulator, clientObj, station, flight, touch} = this.props;
    const {widgetNotify} = this.state;
    //if (clientObj.loginState === "logout" && station.login === false)
    // return null;
    return (
      <div
        style={{zIndex: 500000}}
        className={`widgets ${clientObj.loginState} ${
          clientObj.offlineState ? "offline" : ""
        }`}
      >
        {touch && (
          <Widget
            simulator={simulator}
            station={station}
            flight={flight}
            widget={Widgets.keyboard}
            wkey={"keyboard-auto"}
            clientObj={clientObj}
            notify={widgetNotify.keyboard}
            setNotify={this.setNotify}
            touch={touch}
          />
        )}
        {station.widgets &&
          station.widgets
            .concat()
            .filter(w => (touch ? w !== "keyboard" : true))
            .map(key => {
              const widget = Widgets[key];
              return (
                <Widget
                  simulator={simulator}
                  station={station}
                  flight={flight}
                  widget={widget}
                  wkey={key}
                  clientObj={clientObj}
                  notify={widgetNotify[key]}
                  setNotify={this.setNotify}
                  key={key}
                  touch={touch}
                />
              );
            })}
        <StaticWidget
          icon={FaQuestionCircle}
          name="Training"
          className="help"
          color="#3363AA"
          onClick={this.startTraining}
          touch={touch}
        />
        <StaticWidget
          icon={FaSignOutAlt}
          name="Logout"
          color="#999"
          onClick={this.logout}
          touch={touch}
        />
      </div>
    );
  }
}

const StaticWidget = ({
  icon,
  color,
  onClick = () => {},
  name,
  className = "",
  touch,
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const playEffect = useSoundEffect();

  const toggle = () => {
    if (!tooltipOpen) {
      playEffect("buttonHover");
    }
    setTooltipOpen(!tooltipOpen);
  };
  const Icon = icon;
  return (
    <div className="widget-item">
      <Icon
        size="2em"
        className={`widget-icon ${className}`}
        onClick={e => {
          playEffect("buttonClick");
          onClick(e);
        }}
        id={`widget-${kebabCase(name)}`}
        style={{color: color || "rgb(200,150,255)"}}
      />
      {!touch && (
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpen}
          target={`widget-${kebabCase(name)}`}
          toggle={toggle}
          delay={{show: 0, hide: 20}}
        >
          {name}
        </Tooltip>
      )}
    </div>
  );
};
export default withApollo(WidgetsContainer);
