import { useState } from 'react'
import styled from 'styled-components'
import bottomArrow from '../../assets/Icons/BottomArrowIcon.svg'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownButton = styled.button`
  padding: 8px 12px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  list-style: none;
  padding: 4px 0;
  min-width: 100px;
  z-index: 1000;
`

const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
  }
`

const SortDropdown = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("최신순");

    const handleSelect = (option: string) => {
        setSelected(option);
        setOpen(false);
    }

    return (
        <DropdownContainer>
            <DropdownButton onClick={() => setOpen(prev => !prev)}>
                {selected}  
                <img src={bottomArrow} alt="arrow" style={{ width: '20px' }} />
            </DropdownButton>
            {open && (
                <DropdownList>
                    <DropdownItem onClick={() => handleSelect("최신순")}>최신순</DropdownItem>
                    <DropdownItem onClick={() => handleSelect("인기순")}>인기순</DropdownItem>
                </DropdownList>
            )}
        </DropdownContainer>
    )
}

export default SortDropdown
