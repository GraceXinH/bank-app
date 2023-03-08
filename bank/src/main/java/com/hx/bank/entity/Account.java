package com.hx.bank.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hx.bank.model.AccountType;
import com.hx.bank.model.Status;
import lombok.*;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="accounts")
@Builder
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_seq")
    @SequenceGenerator(name = "account_seq", allocationSize = 1)
    private Long id;
    @ManyToOne
    @JoinColumn(name="userid", referencedColumnName = "id")
    @JsonIgnoreProperties({ "loginname", "password", "firstname", "lastname",
            "email", "address", "phone", "opendate", "credentialsNonExpired", "accountNonExpired",
            "accountNonLocked", "authorities", "username", "enabled", "role"})
    private User user;
    @Column(nullable = false, length = 20)
    private String name;
    @Column(unique=true, nullable = false)
    private Long number;
    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private AccountType type;
    @Column(nullable = false)
    private BigDecimal balance;
    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date opendate;
    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", user=" + user +
                ", name='" + name + '\'' +
                ", number=" + number +
                ", type=" + type +
                ", balance=" + balance +
                ", opendate=" + opendate +
                ", status=" + status +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(id, account.id) && Objects.equals(user, account.user) && Objects.equals(name, account.name) && Objects.equals(number, account.number) && type == account.type && Objects.equals(balance, account.balance) && Objects.equals(opendate, account.opendate) && status == account.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, name, number, type, balance, opendate, status);
    }
}
