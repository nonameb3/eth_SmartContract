import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function Header() {
  return (
    <Menu size="massive" style={{marginTop:"10px"}} >
      <Menu.Item>
        CrowCoin
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          Campaigns
        </Menu.Item>
        <Menu.Item>
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
