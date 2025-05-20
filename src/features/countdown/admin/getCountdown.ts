export const CountdownQuery = `
  query Countdown {
    metaobjectByHandle(handle: {
      handle: "countdown-timer-hdk6lbpl",
      type:"countdown_timer"
    }) {
      id
      fields {
        key
        value
      }
    }
  }
`;
