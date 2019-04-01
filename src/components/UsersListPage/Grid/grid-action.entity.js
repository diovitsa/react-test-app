/**
 * @property {string} id
 * @property {string} title
 * @property {Function} action
 */
export class GridAction {
  constructor(id, title, action) {
    Object.assign(this, { id, title, action });
  }

  execute(data) {
    return this.action(data);
  }
}
